// Engine coordinates are fractions of the unscaled sprite (top-left origin).
// Polished sprites contain no baked flame; each nozzle gets independent live exhaust.
const jet = (x, y, color = '#ffad4f', size = 1) => ({ x, y, color, size, kind: 'jet' });
export const ENGINES = {
  'nuka-marc': [jet(.055,.69,'#ffad66',.9)],
  'falcon-f16': [jet(.05,.55,'#83cfff',.8)],
  'hornet-fa18': [jet(.075,.44,'#ffba66',.65),jet(.065,.55,'#ffba66',.65)],
  'raptor-f22': [jet(.08,.46,'#a8cfff',.6),jet(.07,.59,'#a8cfff',.6)],
  'typhoon': [jet(.05,.53,'#8fe9ec',.85)],
  'rafale': [jet(.04,.49,'#ffa775',.8)],
  'gripen': [jet(.04,.50,'#ffe285',.8)],
  'rivet-raccoon': [jet(.265,.45,'#ffac65',.75)],
  'captain-capy': [jet(.06,.34,'#ffd45f',.8)],
  'foxtrot': [jet(.305,.43,'#ff8e62',.7)],
  'otto-otter': [jet(.26,.31,'#77e6ff',.75)],
  'poppy-panda': [jet(.295,.44,'#ffb78e',.7)],
  'jetpack-penguin': [jet(.065,.345,'#8ae8ff',.8)],
  'jetpack-kiwi': [jet(.065,.455,'#ffbf75',.65)],
  'jetpack-ostrich': [jet(.315,.385,'#ff8657',1)],
  'jetpack-emu': [jet(.265,.414,'#ffac54',.85)],
  'jetpack-cassowary': [jet(.175,.40,'#62cfff',.9)],
  'jetpack-kakapo': [jet(.065,.40,'#aeffa5',.7)],
  'mallard': [],
  'wood-duck': [],
  'mandarin-duck': [],
  'harlequin-duck': [],
  'northern-pintail': [],
  'northern-shoveler': [],
  'hooded-merganser': [],
  'bufflehead': [],
  'ruddy-duck': [],
  'king-eider': [],
  'cinnamon-teal': [],
  'blue-winged-teal': [],
  'redhead': [],
  'canvasback': [],
  'american-wigeon': [],
  'black-bellied-whistling-duck': [],
  'canada-goose': [],
  'snow-goose': [],
  'white-fronted-goose': [],
  'brant': [],
  'barnacle-goose': [],
  'greylag-goose': [],
  'bar-headed-goose': [],
  'emperor-goose': [],

  'jingle-jet': [jet(.025,.64,'#ffdb84',1)],
  'cocoa-comet': [jet(.025,.61,'#a4ffc8',1)],
  'holly-haunt': [jet(.035,.59,'#b1ffe1',1)],
  'kringle-claw': [jet(.03,.62,'#ffa976',1)],
  'gobble-glider': [jet(.025,.60,'#ffce77',1)],
  'maple-maven': [jet(.025,.64,'#ffad69',1)],
  'midnight-mallard': [jet(.025,.58,'#ffe39b',1)],
  'confetti-comet': [jet(.025,.58,'#ffa6ec',1)],
  'disco-dipper': [jet(.045,.43,'#8defff',1)],
  'sparkler-skip': [jet(.025,.67,'#ffdd82',1)],
  'count-quackula': [jet(.075,.57,'#ff6585',1)],
  patchwick: [jet(.025,.63,'#ffb452',1)],
  'hex-hazel': [jet(.035,.60,'#ce8aff',1)],
  mothlight: [jet(.025,.65,'#ffc36e',1)],
  'grim-waddler': [jet(.02,.60,'#a5ffd0',1)],
  quackzar: [jet(.035,.54,'#ffbd75',.65),jet(.08,.67,'#ffbd75',.7)],
  'ziggy-zorb': [jet(.09,.34,'#aaff99',.6),jet(.04,.56,'#aaff99',.7),jet(.1,.75,'#aaff99',.5)],
  'princess-nebula': [jet(.045,.46,'#d8a0ff',.65),jet(.04,.66,'#d8a0ff',.65)],
  gloop: [jet(.055,.49,'#81eaff',.7),jet(.055,.72,'#81eaff',.7)],
  'granny-galaxy': [jet(.045,.4,'#ffd08b',.7),jet(.045,.66,'#ffd08b',.7)],
  'bork-9000': [jet(.09,.5,'#79c9ff',.65),jet(.08,.7,'#79c9ff',.65)],
  'dj-moonbeam': [jet(.045,.42,'#fc85ec',.6),jet(.035,.64,'#80ffff',.65),jet(.13,.79,'#fc85ec',.45)],
  'nibbles-invader': [jet(.055,.38,'#b5ffd4',.6),jet(.05,.59,'#b5ffd4',.65)],
  'sheriff-starbeak': [jet(.02,.45,'#ffd577',.65),jet(.02,.63,'#ffd577',.65)],
  'oopsy-orbit': [jet(.035,.62,'#a0ffec',.95)],
  jag: [jet(.065,.75,'#ff8dc9',1.1)],
  painter: [jet(.284,.78,'#ffc464',.45),jet(.306,.822,'#ffc464',.5),jet(.291,.867,'#ffc464',.45)],
  bigzx: [jet(.034,.77,'#ffad4f',1.1)],
  wyldwolf: [jet(.027,.72,'#ffbf72',1.05)],
  ducky: [],
  amy: [jet(.13,.78)],
  mayra: [jet(.087,.79,'#ff9d62',.95)],
  coffee: [{...jet(.205,.49,'#ffb2e4',.85), angle: -.22}],
  mm777: [jet(.043,.575,'#ffad4f',1.1)],
  pettywiselol: [jet(.025,.75,'#d8a0ff',1.15)],
  youyosong: [jet(.047,.69,'#ffad4f',.9)],
  coconut: [jet(.03,.779,'#c7f77e',.95)],
  bigndn1988: [jet(.072,.51,'#ffad4f',.7)],
  retrochick24: [jet(.064,.77,'#ffad4f',1)],
  sharkbite07: [jet(.053,.62,'#ffad4f',1)],
  dukequackem: [jet(.027,.718,'#ffad4f',1)],
  quackshot01: [jet(.018,.70,'#78d9ff',.7)],
  thunderbill02: [jet(.033,.395,'#ffad4f',.75),jet(.022,.65,'#ffad4f',.75)],
  dustdart03: [jet(.031,.66,'#ffca72',.7)],
  mallardstorm04: [jet(.03,.51,'#ffcc76',.4),jet(.06,.535,'#ffcc76',.4),jet(.03,.65,'#ffcc76',.4),jet(.059,.672,'#ffcc76',.4),jet(.03,.795,'#ffcc76',.4)],
  eggburner05: [jet(.027,.438,'#ffc167',.65),jet(.026,.59,'#ffc167',.65)],
  nightbeak06: [jet(.02,.712,'#86baff',.7)],
  sunfin07: [jet(.024,.508,'#ffbd62',.8)],
  buzzbill08: [jet(.026,.568,'#ffbc69',.8)],
  warwaddler09: [jet(.058,.347,'#ffc66e',.65)],
  novaquack10: [jet(.043,.47,'#d5a0ff',.7),jet(.054,.725,'#d5a0ff',.7)],
  ace01: [jet(.053,.684,'#ffad4f',.7)],
  barkhawk02: [],
  spark03: [jet(.018,.60,'#94e6ff',.8)],
  copilot04: [jet(.02,.646,'#94e6ff',.75)],
  howler05: [jet(.035,.682,'#be9bff',.8)],
  rocket06: [jet(.055,.597,'#ffad4f',.85)],
  astro07: [jet(.016,.592,'#94e6ff',.8)],
  scrappy08: [jet(.023,.601,'#ffad4f',.75)],
  peanut09: [jet(.02,.61,'#ffc5df',.8)],
  nitro10: [jet(.08,.65,'#ffad4f',.75)],
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
    ctx.save();ctx.translate(x,y);ctx.rotate(engine.angle||0);
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
      ctx.beginPath();ctx.arc(x-dx*Math.cos(engine.angle||0)-dy*Math.sin(engine.angle||0),y-dx*Math.sin(engine.angle||0)+dy*Math.cos(engine.angle||0),.55*(1-age)+.2,0,Math.PI*2);ctx.fill();
    }
    ctx.restore();
  }
}
