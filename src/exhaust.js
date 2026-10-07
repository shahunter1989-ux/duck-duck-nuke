// Engine coordinates are fractions of the unscaled sprite (top-left origin).
// Painted exhaust is isolated only at runtime; source artwork stays untouched.
const painted = (x, y, box, color = '#ffad4f') => ({ x, y, box, color, kind: 'painted' });
const jet = (x, y, color = '#ffad4f', size = 1) => ({ x, y, color, size, kind: 'jet' });
export const ENGINES = {
  jag: [jet(.065,.75,'#ff8dc9',1.1)],
  painter: [painted(.32,.84,[0,.72,.32,1],'#ffc464')],
  bigzx: [painted(.15,.76,[0,.59,.15,.94])],
  wyldwolf: [painted(.20,.61,[0,.42,.20,.80])],
  ducky: [],
  amy: [jet(.13,.78)],
  mayra: [painted(.24,.83,[0,.67,.24,1])],
  coffee: [{...painted(.22,.54,[0,.38,.22,.67],'#ffb2e4'), downward: .45}],
  mm777: [painted(.15,.50,[0,.25,.15,.65])],
  pettywiselol: [jet(.025,.75,'#d8a0ff',1.15)],
  youyosong: [painted(.31,.66,[0,.34,.31,1])],
  coconut: [painted(.28,.79,[0,.55,.28,1],'#c7f77e')],
  bigndn1988: [painted(.32,.49,[0,.20,.32,.74])],
  retrochick24: [painted(.23,.86,[0,.68,.23,1])],
  sharkbite07: [painted(.37,.59,[0,.05,.37,1])],
  dukequackem: [painted(.18,.72,[0,.53,.18,.95])],
  quackshot01: [jet(.018,.58,'#78d9ff',.7)],
  thunderbill02: [painted(.13,.25,[0,.15,.13,.37]),painted(.13,.49,[0,.39,.13,.61])],
  dustdart03: [jet(.026,.63,'#ffca72',.7)],
  mallardstorm04: [jet(.035,.45,'#ffcc76',.55),jet(.035,.62,'#ffcc76',.55),jet(.035,.80,'#ffcc76',.55)],
  eggburner05: [jet(.085,.40,'#ffc167',.65),jet(.085,.55,'#ffc167',.65)],
  nightbeak06: [jet(.025,.64,'#86baff',.7)],
  sunfin07: [jet(.055,.53,'#ffbd62',.8)],
  buzzbill08: [jet(.03,.57,'#ffbc69',.8)],
  warwaddler09: [jet(.055,.35,'#ffc66e',.6)],
  novaquack10: [painted(.10,.49,[0,.37,.10,.62],'#d5a0ff'),painted(.12,.79,[.025,.68,.12,.92],'#d5a0ff')],
  ace01: [painted(.06,.71,[0,.59,.06,.84])],
  barkhawk02: [],
  spark03: [painted(.065,.45,[0,.37,.065,.52],'#94e6ff'),painted(.065,.70,[0,.62,.065,.80],'#94e6ff')],
  copilot04: [painted(.06,.38,[0,.25,.06,.50],'#94e6ff'),painted(.06,.61,[0,.53,.06,.73],'#94e6ff')],
  howler05: [painted(.075,.64,[0,.45,.075,.80],'#be9bff')],
  rocket06: [painted(.12,.51,[0,.28,.12,.78])],
  astro07: [painted(.06,.50,[0,.39,.06,.64],'#94e6ff')],
  scrappy08: [painted(.10,.48,[0,.25,.10,.67])],
  peanut09: [painted(.15,.61,[0,.35,.15,.90],'#ffc5df')],
  nitro10: [painted(.13,.67,[0,.51,.13,.84])],
};

export function exhaustState(time, power, motion = true, seed = 0) {
  if (!motion) return { stretch: 1, width: 1, wave: 0 };
  const t = time;
  const flicker = motion ? Math.sin(t*31+seed)*.07 + Math.sin(t*53+seed*2)*.04 : 0;
  return { stretch: .90 + power*.65 + flicker, width: .88 + power*.23 + flicker*.4, wave: t*24+seed };
}

export class ExhaustRenderer {
  constructor() { this.layers = new Map(); }
  prepare(image, id, engines) {
    if (this.layers.has(id)) return this.layers.get(id);
    const width = image.naturalWidth, height = image.naturalHeight;
    const body = document.createElement('canvas'); body.width=width;body.height=height;
    const ctx=body.getContext('2d');ctx.drawImage(image,0,0);
    const plumes=engines.map(engine=>{
      if (!engine.box) return null;
      const [left,top,right,bottom]=engine.box;
      const x=Math.floor(left*width),y=Math.floor(top*height),w=Math.ceil(right*width)-x,h=Math.ceil(bottom*height)-y;
      const layer=document.createElement('canvas');layer.width=w;layer.height=h;
      const plumeContext=layer.getContext('2d');
      if (engine.mask) {
        const outline=new Path2D();engine.mask.forEach(([px,py],i)=>i?outline.lineTo(px*width,py*height):outline.moveTo(px*width,py*height));outline.closePath();
        plumeContext.save();plumeContext.translate(-x,-y);plumeContext.clip(outline);plumeContext.drawImage(image,0,0);plumeContext.restore();
        ctx.save();ctx.clip(outline);ctx.clearRect(x,y,w,h);ctx.restore();
      } else { plumeContext.drawImage(image,x,y,w,h,0,0,w,h);ctx.clearRect(x,y,w,h); }
      return {image:layer,x,y,w,h};
    });
    const result={body,plumes};this.layers.set(id,result);return result;
  }
  draw(ctx,image,id,w,h,time,power,motion,active=true) {
    const engines=ENGINES[id] || [];
    const layers=this.prepare(image,id,engines);
    const sx=w/image.naturalWidth,sy=h/image.naturalHeight;
    engines.forEach((engine,index)=>{
      const state=exhaustState(time,active?power:0,motion,index*2.4);
      const x=(engine.x-.5)*w,y=(engine.y-.5)*h;
      if(engine.kind==='painted') {
        const plume=layers.plumes[index];
        // Narrow strips carry a travelling wave downstream. The engine end stays pinned.
        const strips=18,step=plume.w/strips;
        for(let i=0;i<strips;i++) {
          const sourceX=i*step, sourceW=Math.min(step+.5,plume.w-sourceX);
          const sourceWorld=(plume.x+sourceX)*sx-w/2;
          const downstream=Math.max(0,(x-sourceWorld)/Math.max(1,plume.w*sx));
          const dy=motion ? Math.sin(state.wave-downstream*7)*downstream*Math.min(1.65,plume.h*sy*.12) + (engine.downward||0)*downstream*(state.stretch-1)*plume.w*sx : 0;
          const localWidth=1+(state.width-1)*downstream;
          const destX=x+(sourceWorld-x)*state.stretch;
          const destY=y+((plume.y*sy-h/2)-y)*localWidth+dy;
          ctx.drawImage(plume.image,sourceX,0,sourceW,plume.h,destX,destY,sourceW*sx*state.stretch,plume.h*sy*localWidth);
        }
      } else this.jet(ctx,x,y,time,state,power,engine,motion);
      if (motion && active) this.embers(ctx,x,y,time,power,engine,index);
    });
    ctx.drawImage(layers.body,-w/2,-h/2,w,h);
  }
  jet(ctx,x,y,time,state,power,engine,motion) {
    const size=engine.size||1,length=(14+power*20)*state.stretch*size,radius=(3+power*1.3)*size;
    ctx.save();ctx.translate(x,y);
    const glow=ctx.createRadialGradient(-length*.3,0,0,-length*.3,0,length*.8);
    glow.addColorStop(0,engine.color+'55');glow.addColorStop(1,engine.color+'00');
    ctx.fillStyle=glow;ctx.fillRect(-length*1.2,-length*.8,length*1.6,length*1.6);
    for (const [scale,color] of [[1,engine.color],[.73,'#ffe3ad'],[.4,'#fff9e9']]) {
      const l=length*scale,r=radius*scale,bend=motion?Math.sin(time*39+scale*4)*2*scale:0;
      ctx.fillStyle=color;ctx.beginPath();ctx.moveTo(1,-r);
      ctx.bezierCurveTo(-l*.32,-r*1.4,-l*.7,bend-r*.45,-l,bend);
      ctx.bezierCurveTo(-l*.65,bend+r*.45,-l*.25,r*1.4,1,r);ctx.closePath();ctx.fill();
    }
    ctx.restore();
  }
  embers(ctx,x,y,time,power,engine,index) {
    ctx.save();ctx.fillStyle=engine.color;
    for(let i=0;i<3;i++) {
      const age=((time*(1.5+power*.5)+i/3+index*.13)%1+1)%1;
      ctx.globalAlpha=(1-age)*(.18+power*.28);
      const dx=age*(22+power*30),dy=Math.sin(i*9+index)*age*(4+power*4);
      ctx.beginPath();ctx.arc(x-dx,y+dy,.55*(1-age)+.2,0,Math.PI*2);ctx.fill();
    }
    ctx.restore();
  }
}
