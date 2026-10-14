/* global figma */
/* Native editable Figma layers; source controls retain Beautiful UI and Lucide attribution. */
const ICONS = {"LoaderCircle":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-loader-circle\" aria-hidden=\"true\"><path d=\"M21 12a9 9 0 1 1-6.219-8.56\"></path></svg>","Minus":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-minus\" aria-hidden=\"true\"><path d=\"M5 12h14\"></path></svg>","Plus":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-plus\" aria-hidden=\"true\"><path d=\"M5 12h14\"></path><path d=\"M12 5v14\"></path></svg>","ChevronDown":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-chevron-down\" aria-hidden=\"true\"><path d=\"m6 9 6 6 6-6\"></path></svg>","Layers":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-layers\" aria-hidden=\"true\"><path d=\"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z\"></path><path d=\"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12\"></path><path d=\"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17\"></path></svg>","MapPin":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-map-pin\" aria-hidden=\"true\"><path d=\"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0\"></path><circle cx=\"12\" cy=\"10\" r=\"3\"></circle></svg>","MessageCircle":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-message-circle\" aria-hidden=\"true\"><path d=\"M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719\"></path></svg>","Folder":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-folder\" aria-hidden=\"true\"><path d=\"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z\"></path></svg>","FlaskConical":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-flask-conical\" aria-hidden=\"true\"><path d=\"M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2\"></path><path d=\"M6.453 15h11.094\"></path><path d=\"M8.5 2h7\"></path></svg>"};
const PALETTE = {
  Light: { page: [0.985,0.001,286.376], canvas: [0.961,0.002,247.84], surface: [1,0,0], inset: [0.979,0.002,247.839], ink: [0.247,0.006,258.361], muted: [0.506,0.01,264.477], line: [0.946,0.003,264.542], strong: [0.912,0.005,258.326], hover: [0.933,0.003,247.86], red: [0.621,0.192,23.042], redTint: [0.956,0.017,17.462], green: [0.603,0.155,150.883], greenTint: [0.958,0.017,159.118] },
  Dark: { page: [0.209,0.004,264.477], canvas: [0.231,0.004,264.487], surface: [0.26,0.006,271.191], inset: [0.243,0.004,264.492], ink: [0.964,0.002,247.839], muted: [0.731,0.008,260.731], line: [0.308,0.006,258.354], strong: [0.356,0.007,264.474], hover: [0.318,0.007,274.747], red: [0.666,0.18,21.433], redTint: [0.666,0.18,21.433,0.14], green: [0.705,0.154,153.814], greenTint: [0.705,0.154,153.814,0.14] },
};
let STAGE='Starting';
const COMPONENTS = {};
const LINKS = [];
const SCREENS = {};
const TITLES = ['Landing','Sign in','Plots','Plot & tree entry','Soil input','Carbon results','Plot map','Export','Manager chatbot','Visitor education','UI sandbox','Project examples'];
function rgb([L,C,H]) {
  const a=C*Math.cos(H*Math.PI/180), b=C*Math.sin(H*Math.PI/180);
  const l=(L+0.3963377774*a+0.2158037573*b)**3;
  const m=(L-0.1055613458*a-0.0638541728*b)**3;
  const s=(L-0.0894841775*a-1.291485548*b)**3;
  const gamma=(v)=>Math.max(0,Math.min(1,v<=0.0031308?12.92*v:1.055*v**(1/2.4)-0.055));
  return { r:gamma(4.0767416621*l-3.3077115913*m+0.2309699292*s), g:gamma(-1.2684380046*l+2.6097574011*m-0.3413193965*s), b:gamma(-0.0041960863*l-0.7034186147*m+1.707614701*s) };
}
function paint(theme,token) { const v=PALETTE[theme][token]; return { type:'SOLID', color:rgb(v), opacity:v[3]===undefined?1:v[3] }; }
function box(parent,name,x,y,w,h,theme,token='surface',radius=10,type='FRAME') {
  const n=type==='COMPONENT'?figma.createComponent():figma.createFrame();
  parent.appendChild(n); n.name=name; n.x=x; n.y=y; n.resize(w,h); n.fills=[paint(theme,token)]; n.cornerRadius=radius; n.clipsContent=false;
  return n;
}
function text(parent,value,x,y,w,size=14,theme='Light',token='ink',weight='Regular') {
  const n=figma.createText(); parent.appendChild(n); n.name=value; n.fontName={family:'Inter',style:weight}; n.fontSize=size;
  n.lineHeight={unit:'PIXELS',value:size>=30?size+6:size>=18?28:size===12?16:20};
  n.characters=value; n.fills=[paint(theme,token)]; n.resize(w,20); n.textAutoResize='HEIGHT'; n.x=x; n.y=y;
  return n;
}
function icon(parent,name,x,y,theme,token='muted',size=16) {
  if(!ICONS[name]) throw new Error('Missing Lucide icon: '+name);
  const n=figma.createNodeFromSvg(ICONS[name]); parent.appendChild(n); n.name='Lucide / '+name; n.resize(size,size); n.x=x; n.y=y;
  for(const v of n.findAll(n=>n.type==='VECTOR')) { if(v.strokes.length) v.strokes=[paint(theme,token)]; if(v.fills.length) v.fills=[paint(theme,token)]; }
  return n;
}
function line(parent,x,y,w,theme) { return box(parent,'Divider',x,y,w,1,theme,'line',0); }
function instance(parent,key,x,y,w,h,label) {
  const n=COMPONENTS[key].createInstance(); parent.appendChild(n); n.x=x; n.y=y;
  if(w!==undefined) n.resize(w,h===undefined?n.height:h);
  if(label!==undefined) { const t=n.findOne(n=>n.type==='TEXT'&&n.name==='Label'); if(t) t.characters=label; }
  return n;
}
function button(parent,label,x,y,theme,variant='primary',target,size='md',state='Default') {
  const n=instance(parent,`Button/${theme}/${variant}/${size}/${state}`,x,y,undefined,undefined,label);
  n.resize(Math.max(n.width,label.length*(size==='lg'?7:6.5)+(size==='lg'?32:24)),n.height);
  if(target) { n.setPluginData('destination',target); LINKS.push({node:n,target}); } return n;
}
function card(parent,title,x,y,w,h,theme) {
  const n=box(parent,title,x,y,w,h,theme,'surface'); n.fills=[];
  instance(n,`Card/${theme}`,0,0,w,h);
  if(title) text(n,title,20,18,w-40,18,theme,'ink','Semi Bold');
  return n;
}
function field(parent,label,value,x,y,w,theme,kind='Input',state='Default') {
  const n=box(parent,label,x,y,w,68,theme,'surface',0); n.fills=[];
  text(n,label,0,0,w,14,theme,'ink','Medium');
  instance(n,`${kind}/${theme}/${state}`,0,28,w,kind==='Textarea'?112:38,value);
  return n;
}
function notice(parent,value,x,y,w,theme,tone='info') {
  const n=instance(parent,`Notice/${theme}/${tone}`,x,y,w,undefined,value);
  n.resize(w,Math.max(52,n.findOne(n=>n.type==='TEXT').height+24)); return n;
}
function variants(page,name,items) { const s=figma.combineAsVariants(items,page); s.name=name; s.x=0; s.y=COMPONENTS._y; COMPONENTS._y+=s.height+100; return s; }
function buildComponents(page) {
  COMPONENTS._y=200;
  const buttons=[];
  for(const theme of ['Light','Dark']) for(const variant of ['primary','secondary','ghost','danger','quiet']) for(const [size,height,font,padding] of [['xs',24,11.5,8],['sm',28,12,10],['md',32,12.5,12],['lg',40,14,16]]) for(const state of ['Default','Disabled','Loading','Focus','Pressed']) {
    const index=buttons.length;
    const token=variant==='primary'?'ink':variant==='ghost'?'hover':variant==='danger'?'redTint':'surface';
    const n=box(page,`Theme=${theme}, Variant=${variant}, Size=${size}, State=${state}`,(index%10)*180,Math.floor(index/10)*65,140,height,theme,token,8,'COMPONENT');
    n.layoutMode='HORIZONTAL'; n.primaryAxisSizingMode='AUTO'; n.counterAxisSizingMode='FIXED'; n.primaryAxisAlignItems='CENTER'; n.counterAxisAlignItems='CENTER'; n.itemSpacing=size==='xs'?4:size==='lg'?8:6; n.paddingLeft=padding; n.paddingRight=padding;
    if(variant==='quiet') n.fills=[];
    if(variant==='secondary'||variant==='danger') { n.strokes=[paint(theme,variant==='danger'?'red':'strong')]; n.strokeWeight=1; }
    if(state==='Focus') { n.strokes=[paint(theme,'ink')]; n.strokeWeight=2; n.strokeAlign='OUTSIDE'; }
    if(state==='Loading') icon(n,'LoaderCircle',0,0,theme,variant==='primary'?'canvas':'ink',font);
    const label=text(n,'Button',0,0,60,font,theme,variant==='primary'?'canvas':variant==='danger'?'red':'ink',size==='xs'?'Regular':'Medium'); label.name='Label'; label.textAutoResize='WIDTH_AND_HEIGHT';
    if(state==='Disabled'||state==='Loading') n.opacity=0.5;
    n.description='src/components/ui/button.tsx; DESIGN.md DES-04. Focus outline is 2px with 3px offset in CSS; pressed scale is 0.98.';
    COMPONENTS[`Button/${theme}/${variant}/${size}/${state}`]=n; buttons.push(n);
  }
  variants(page,'Button',buttons);
  for(const kind of ['Input','NumberInput','Textarea','Select']) {
    const nodes=[];
    for(const theme of ['Light','Dark']) for(const state of ['Default','Disabled','Invalid','Focus']) {
      const n=box(page,`Theme=${theme}, State=${state}`,(nodes.length%4)*320,Math.floor(nodes.length/4)*155,280,kind==='Textarea'?112:38,theme,'inset',8,'COMPONENT');
      n.strokes=[paint(theme,state==='Invalid'?'red':state==='Focus'?'ink':'strong')]; n.strokeWeight=state==='Focus'?2:1;
      const t=text(n,kind==='Select'?'Select an option':kind==='NumberInput'?'16.2':'Enter value',kind==='NumberInput'?40:12,kind==='Textarea'?8:9,kind==='NumberInput'?200:240,14,theme,'muted'); t.name='Label';
      if(kind==='NumberInput') { icon(n,'Minus',8,11,theme); const plus=icon(n,'Plus',256,11,theme); plus.constraints={horizontal:'MAX',vertical:'MIN'}; t.constraints={horizontal:'STRETCH',vertical:'MIN'}; t.textAlignHorizontal='CENTER'; }
      if(kind==='Select') { const arrow=icon(n,'ChevronDown',252,11,theme); arrow.constraints={horizontal:'MAX',vertical:'MIN'}; }
      if(state==='Disabled') n.opacity=0.5;
      COMPONENTS[`${kind}/${theme}/${state}`]=n; nodes.push(n);
    }
    variants(page,kind,nodes);
  }
  const cards=[];
  for(const theme of ['Light','Dark']) {
    const n=box(page,`Theme=${theme}`,cards.length*330,0,300,140,theme,'surface',10,'COMPONENT'); n.strokes=[paint(theme,'line')]; n.strokeWeight=1;
    n.effects=[{type:'DROP_SHADOW',color:{r:0,g:0,b:0,a:theme==='Dark'?0.2:0.05},offset:{x:0,y:2},radius:6,spread:0,visible:true,blendMode:'NORMAL'}];
    n.description='Card: 20px content padding, 10px radius, --shadow-card. See src/app/globals.css.';
    COMPONENTS[`Card/${theme}`]=n; cards.push(n);
  }
  variants(page,'Card',cards);
  const notices=[];
  for(const theme of ['Light','Dark']) for(const tone of ['info','success','error']) {
    const n=box(page,`Theme=${theme}, Tone=${tone}`,(notices.length%3)*490,Math.floor(notices.length/3)*100,460,60,theme,tone==='error'?'redTint':tone==='success'?'greenTint':'hover',8,'COMPONENT');
    const label=text(n,'Status message',16,12,428,14,theme,tone==='error'?'red':tone==='success'?'green':'ink'); label.name='Label';
    COMPONENTS[`Notice/${theme}/${tone}`]=n; notices.push(n);
  }
  variants(page,'Notice',notices);
  for(const theme of ['Light','Dark']) for(const [token,value] of Object.entries(PALETTE[theme])) {
    const s=figma.createPaintStyle(); s.name=`Mangrove/${theme}/${token}`; s.paints=[paint(theme,token)]; s.description=`DESIGN.md; source OKLCH ${value.join(' ')}`;
  }
  for(const [name,size,weight] of [['Page title',36,'Semi Bold'],['Mobile title',30,'Semi Bold'],['Section',18,'Semi Bold'],['Body',14,'Regular'],['Label',14,'Medium'],['Metadata',12,'Regular']]) {
    const s=figma.createTextStyle(); s.name='Mangrove/'+name; s.fontName={family:'Inter',style:weight}; s.fontSize=size; s.lineHeight={unit:'PIXELS',value:size>=30?size+6:size>=18?28:size===12?16:20};
  }
  text(page,'Base UI · DESIGN.md',0,0,1000,36,'Light','ink','Semi Bold');
  text(page,'Neutral controls · Inter · 8px controls · 10px cards · editable component variants',0,58,1100,14,'Light','muted');
  const reference=card(page,'Read before using the prototype',0,COMPONENTS._y,920,220,'Light');
  text(reference,'Native Figma components represent existing controls; Base UI keyboard behavior is implemented in React.\nClay informs spacing and hierarchy. No external brand assets or accent palette.\nAll product data, map shapes and chatbot answers are illustrative. Scientific methods, roles and routes remain open.\nExisting website examples and sandbox remain intact.',20,62,880,14,'Light');
}
function table(parent,x,y,w,theme,headers,rows,target) {
  const n=card(parent,'',x,y,w,44+rows.length*48,theme);
  const tw=w<500&&headers.length>2?760:w; n.clipsContent=true; n.overflowDirection='HORIZONTAL'; const widths=headers.map((_,i)=>i===0?tw*0.38:tw*0.62/(headers.length-1));
  let offset=0;
  const head=box(n,'Header',0,0,tw,38,theme,'inset',0);
  headers.forEach((h,i)=>{text(head,h,offset+12,11,widths[i]-24,12,theme,'muted','Medium');offset+=widths[i];});
  rows.forEach((row,j)=>{let ox=0; const r=box(n,'Record '+row[0],0,38+j*48,tw,48,theme,'surface',0); line(r,0,47,tw,theme); row.forEach((value,i)=>{const t=text(r,String(value),ox+12,15,widths[i]-24,12,theme); if(typeof value==='number') t.textAlignHorizontal='RIGHT'; ox+=widths[i];}); if(target) LINKS.push({node:r,target});});
  return n;
}
function screen(page,index,theme,mobile,variant='Default') {
  const id=`SCR-${String(index+1).padStart(2,'0')}`;
  const name=`${id} · ${TITLES[index]} · ${mobile?'360':'1440'} · ${theme}${variant==='Default'?'':' · '+variant}`;
  const n=box(page,name,0,0,mobile?360:1440,mobile?1380:1000,theme,'page',0); n.clipsContent=true;
  n.setPluginData('screenId',id); n.setPluginData('theme',theme); n.setPluginData('variant',variant);
  const key=`${index}/${theme}/${mobile}/${variant}`; SCREENS[key]=n;
  const publicScreen=[0,1,9,10].includes(index);
  const x=mobile?24:publicScreen?80:280, w=mobile?312:publicScreen?1280:1120;
  if(index!==0) {
    if(!publicScreen&&!mobile) {
      const side=box(n,'Prototype navigation',0,0,240,n.height,theme,'canvas',0);
      text(side,'Mangrove inventory',20,28,200,16,theme,'ink','Semi Bold');
      text(side,'Sample workspace',20,60,200,12,theme,'muted');
      [[2,'Plots','Layers'],[6,'Plot map','MapPin'],[8,'Manager chatbot','MessageCircle'],[11,'Project examples','Folder'],[10,'UI sandbox','FlaskConical']].forEach(([to,label,glyph],i)=>{const nav=box(side,label,12,118+i*48,216,40,theme,index===to?'hover':'canvas',8); icon(nav,glyph,12,12,theme); text(nav,label,38,10,164,14,theme); LINKS.push({node:nav,target:`${to}/${theme}/${mobile}/Default`});});
      text(side,'Prototype navigation\nRoutes pending Q-10/Q-16',20,860,200,12,theme,'muted');
    }
    if(mobile&&!publicScreen) { text(n,'Mangrove inventory',24,20,228,14,theme,'ink','Medium'); icon(n,'Layers',314,22,theme); }
    const titleY=mobile?publicScreen?36:76:48;
    text(n,TITLES[index],x,titleY,w,mobile?30:36,theme,'ink','Semi Bold');
    text(n,index===10?'Component catalog · all 81 demos remain available':'Prototype · sample data · content and permissions pending approval',x,titleY+52,w,12,theme,'muted');
    if(!mobile&&index!==10) {const toggle=button(n,theme==='Light'?'Dark mode':'Light mode',n.width-150,52,theme,'secondary',`${index}/${theme==='Light'?'Dark':'Light'}/${mobile}/${variant}`);toggle.name='ThemeToggle';}
  }
  const y=mobile?158:160, fw=Math.min(672,w), size=mobile?'lg':'md';
  const target=(to,v='Default')=>`${to}/${theme}/${mobile}/${v}`;
  const go=(label,to,yy,variant='primary',state='Default')=>button(n,label,x,yy,theme,variant,target(to,state),size);
  if(index===0) { button(n,'Open sandbox',(n.width-130)/2,n.height/2-16,theme,'primary',target(10)); }
  if(index===1) {
    const c=card(n,variant==='Register'?'Create account':variant==='Confirmation'?'Confirm your email':'Sign in',mobile?x:480,y,mobile?w:480,variant==='Confirmation'?280:420,theme);
    field(c,'Email address','you@example.com',20,66,c.width-40,theme);
    if(variant!=='Confirmation') field(c,'Password','••••••••',20,160,c.width-40,theme);
    button(c,variant==='Confirmation'?'Resend confirmation':variant==='Register'?'Create account':'Sign in',20,variant==='Confirmation'?166:256,theme,'primary',target(variant==='Register'?1:2,variant==='Register'?'Confirmation':'Default'),size);
    if(variant==='Default') {button(c,'Create account',20,320,theme,'quiet',target(1,'Register'));button(c,'Retry confirmation',20,360,theme,'quiet',target(1,'Confirmation'));}
  }
  if(index===2) {
    go('Create plot',3,y);
    table(n,x,y+72,w,theme,['Plot','Location / context','Carbon'],[['P-001','Sample plot','Incomplete'],['P-002','Sample plot','Not calculated'],['P-003','Sample plot','Not calculated']],target(5));
    notice(n,'Only accessible records belong in this view. These records are fictional.',x,y+306,w,theme);
    go('Explore plot map',6,y+398,'secondary');
  }
  if(index===3) {
    let c=card(n,'Plot context',x,y,fw,mobile?290:210,theme);
    field(c,'Plot identifier','P-001',20,66,mobile?fw-40:290,theme); field(c,'Plot area (m²)','400 · illustrative',mobile?20:336,mobile?160:66,mobile?fw-40:290,theme,'NumberInput');
    c=card(n,'Location',x,y+(mobile?314:234),fw,160,theme); text(c,'Coordinates and GPS behavior await Q-06.\nNo real location is used in this prototype.',20,62,fw-40,14,theme,'muted');
    c=card(n,'Tree measurement · sample',x,y+(mobile?498:418),fw,mobile?280:250,theme);
    field(c,'Species','Rhizophora sp. · sample',20,66,fw-40,theme,'Select'); field(c,'DBH (cm)','16.2',20,160,mobile?fw-40:290,theme,'NumberInput',variant==='Validation'?'Invalid':'Default');
    const by=y+(mobile?812:702);
    if(variant==='Validation') {notice(n,'Enter a positive DBH value. Your input is retained.',x,by,fw,theme,'error');go('Correct sample input',3,by+92,'secondary');}
    else {go('Save measurements',4,by); button(n,'Validation example',x+(mobile?0:194),by+(mobile?64:0),theme,'quiet',target(3,'Validation'),size);}
  }
  if(index===4) {
    const c=card(n,'Soil sample · illustrative fields',x,y,fw,mobile?542:350,theme);
    const fields=[['Sample identifier','CORE-001'],['Layer depth (cm)','0–30 · illustrative'],['Dry mass (g)','Awaiting laboratory input'],['Core volume (cm³)','Awaiting laboratory input']];
    fields.forEach(([label,value],i)=>field(c,label,value,mobile?20:20+(i%2)*316,66+(mobile?i:Math.floor(i/2))*96,mobile?fw-40:296,theme));
    notice(c,'Exact lab fields and LOI conversion require scientific approval.',20,mobile?458:266,fw-40,theme);
    go('View incomplete result',5,y+(mobile?582:390));
  }
  if(index===5) {
    const incomplete=variant!=='Complete';
    notice(n,incomplete?'Incomplete — soil carbon unavailable. Total ecosystem carbon is not calculated.':'Illustrative complete result only — not a validated carbon estimate.',x,y,w,theme);
    const labels=['AGB carbon','BGB carbon','SOC','Total ecosystem carbon']; const values=incomplete?['115','31','Not calculated','Incomplete']:['115','31','90','236'];
    const cols=mobile?1:4, cw=mobile?w:(w-48)/4, mh=132;
    labels.forEach((label,i)=>{const c=card(n,label,x+(i%cols)*(cw+16),y+110+Math.floor(i/cols)*(mh+16),cw,mh,theme);text(c,values[i],20,58,cw-40,values[i].length>8?18:30,theme,'ink','Semi Bold');if(values[i].length<8)text(c,'Mg C/ha · sample',20,104,cw-40,12,theme,'muted');});
    const cy=y+(mobile?718:282);const c=card(n,'Method and input provenance',x,cy,fw,200,theme);text(c,'Plot: P-001 · fictional record\nEquation/version: awaiting approval\nTree and laboratory inputs: sample / incomplete\nNo formula or scientific precision is selected.',20,62,fw-40,14,theme,'muted');
    go('Open plot map',6,cy+232); button(n,'Export',x+(mobile?0:150),cy+(mobile?294:232),theme,'secondary',target(7),size);
    button(n,incomplete?'Complete state example':'Incomplete state example',x,cy+(mobile?358:294),theme,'quiet',target(5,incomplete?'Complete':'Default'),size);
  }
  if(index===6) {
    const mw=mobile?w:w-344, mh=mobile?320:480;
    const m=card(n,'',x,y,mw,mh,theme);const drawing=box(m,'Schematic map — not geospatial data',0,0,mw,mh,theme,'canvas');
    for(let i=0;i<8;i++) line(drawing,0,40+i*60,mw,theme);
    for(let i=0;i<6;i++) box(drawing,'Schematic grid',40+i*100,0,1,mh,theme,'line',0);
    for(const [px,py,label] of [[0.25,0.35,'P-001'],[0.62,0.59,'P-002'],[0.42,0.74,'P-003']]) {const p=box(drawing,label,mw*px-16,mh*py-16,32,32,theme,'surface',8);icon(p,'MapPin',8,8,theme,'ink');LINKS.push({node:p,target:target(5)});text(drawing,label,mw*px+22,mh*py-8,72,12,theme,'ink','Medium');}
    text(drawing,'Schematic only · no map provider or real coordinates',16,mh-44,mw-32,12,theme,'muted');
    const c=card(n,'Selected plot',mobile?x:x+mw+24,mobile?y+344:y,mobile?w:320,270,theme);text(c,'P-001\nSample tree and soil records\nSOC: not calculated\nTotal: incomplete',20,64,c.width-40,14,theme);button(c,'Open plot',20,208,theme,'primary',target(5),size);
    const yy=mobile?y+646:y+516;table(n,x,yy,mobile?w:mw,theme,['Plot','Carbon summary'],[['P-001','Incomplete'],['P-002','Not calculated']],target(5));
  }
  if(index===7) {
    const c=card(n,'Export selected plot',x,y,fw,variant==='Success'?286:420,theme);text(c,'P-001 · sample selection\nUnits, completeness and provenance remain visible.',20,66,fw-40,14,theme,'muted');
    if(variant==='Success') {notice(c,'Prototype preview complete. No real file or report was generated.',20,150,fw-40,theme,'success');button(c,'Back to plot',20,230,theme,'secondary',target(5),size);}
    else {field(c,'Dataset format','CSV / XLSX · choice pending Q-09',20,152,fw-40,theme,'Select');button(c,'Preview dataset export',20,262,theme,'primary',target(7,'Success'),size);button(c,'Preview report export',20,326,theme,'secondary',target(7,'Success'),size);}
  }
  if(index===8||index===9) {
    const c=card(n,index===8?'Plot-data conversation':'Conservation education',x,y,fw,mobile?560:520,theme);
    const visitor=index===9;
    const question=visitor?'What is blue carbon?':'Is soil carbon available for P-001?';
    const bubble=box(c,'Question',20,70,fw-40,80,theme,'inset',8);text(bubble,question,16,16,fw-72,14,theme);
    if(variant==='Answer') {text(c,visitor?'Educational response preview. Approved conservation content and source material will be supplied before implementation.':'P-001 has no laboratory inputs in this sample. Soil carbon and total ecosystem carbon have not been calculated.',20,178,fw-40,14,theme);text(c,visitor?'Source: content approval pending Q-08':'Source: P-001 · sample record · incomplete inputs',20,300,fw-40,12,theme,'muted');}
    else text(c,'Send the sample question to preview an answer.\nThis is a static prototype, not a connected AI service.',20,176,fw-40,14,theme,'muted');
    field(c,'Message',question,20,374,fw-40,theme,'Input');button(c,'Send',20,472,theme,'primary',target(index,'Answer'),size);
    if(!visitor) go('Open source plot',5,y+(mobile?604:564),'secondary');
  }
  if(index===10) {
    const c=card(n,'Existing UI catalog',x,y,Math.min(820,w),420,theme);text(c,'81 public component demos\nButtons, inputs, notices, tables, overlays and more.\nThis Figma frame summarizes the existing sandbox; it does not replace its demos.',20,66,c.width-40,14,theme,'muted');
    button(c,'Button',20,186,theme);field(c,'Input','Sample value',20,246,c.width-40,theme);button(c,'Open prototype sign in',20,346,theme,'secondary',target(1),size);
  }
  if(index===11) {
    const c=card(n,'Starter project examples',x,y,fw,330,theme);text(c,'Private project CRUD remains available.\nProject data is not mangrove field data.\nExisting ownership, auth and confirmation behavior are preserved.',20,66,fw-40,14,theme,'muted');
    field(c,'Project name','Sample project',20,174,fw-40,theme);button(c,'View product prototype',20,266,theme,'secondary',target(2),size);
  }
  return n;
}
async function dashboardReference(library) {
  const existing=figma.root.children.find(p=>p.getPluginData('dashboardReference')==='complete');
  if(existing&&existing.getPluginData('referenceVersion')==='2') return;
  const pending=figma.root.children.find(p=>p.name==='Dashboard content · supplied references'&&p.children.filter(n=>n.getPluginData('referencePanel')).length===20);
  for(const style of ['Regular','Medium','Semi Bold']) await figma.loadFontAsync({family:'Inter',style});
  for(const set of library.children.filter(n=>n.type==='COMPONENT_SET')) for(const c of set.children) {
    const props=Object.fromEntries(c.name.split(', ').map(v=>v.split('=')));
    const key=set.name==='Button'?`Button/${props.Theme}/${props.Variant}/${props.Size}/${props.State}`:set.name==='Card'?`Card/${props.Theme}`:set.name==='Notice'?`Notice/${props.Theme}/${props.Tone}`:`${set.name}/${props.Theme}/${props.State}`;
    COMPONENTS[key]=c;
  }
  if(pending) {await enrichReference(pending);await finishReference(pending);return;}
  const page=figma.createPage();page.name='Dashboard content · supplied references';await figma.setCurrentPageAsync(page);
  page.setPluginData('dashboardReference','building');
  const panels=['Ringkasan','Input data lapangan','Perhitungan AGB & BGB','Bulk density & SOC','Stok karbon total'];
  const created=[];
  for(const [group,theme,mobile] of [[0,'Light',false],[1,'Dark',false],[2,'Light',true],[3,'Dark',true]]) for(let panel=0;panel<5;panel++) {
    const n=box(page,`REF-${panel+1} · ${panels[panel]} · ${mobile?360:1440} · ${theme}`,panel*(mobile?440:1540),group*2800,mobile?360:1440,mobile?2380:1120,theme,'page',0);
    n.clipsContent=true;n.setPluginData('referencePanel',String(panel));n.setPluginData('theme',theme);created.push(n);
    const x=mobile?24:280,w=mobile?312:1120,y=mobile?356:170;
    if(!mobile) {
      const side=box(n,'Navigation proposal',0,0,240,n.height,theme,'canvas',0);text(side,'Mangrove inventory',20,30,200,16,theme,'ink','Semi Bold');
      panels.forEach((label,i)=>{const row=box(side,label,12,112+i*48,216,40,theme,panel===i?'hover':'canvas',8);icon(row,['Layers','Folder','Layers','FlaskConical','Layers'][i],12,12,theme);text(row,label,38,10,168,12,theme);});
      text(side,'Prototype · data contoh\nRute belum ditetapkan',20,1000,200,12,theme,'muted');
    } else {
      text(n,'Mangrove inventory',24,20,312,14,theme,'ink','Medium');
      panels.forEach((label,i)=>{const action=button(n,label,24,54+i*36,theme,panel===i?'primary':'quiet',undefined,'sm');action.resize(Math.min(action.width,312),28);});
    }
    text(n,panels[panel],x,mobile?274:48,w,mobile?30:36,theme,'ink','Semi Bold');
    text(n,'Data contoh · bukan hasil penelitian tervalidasi',x,mobile?322:102,w,12,theme,'muted');
    button(n,theme==='Light'?'Dark mode':'Light mode',mobile?x:n.width-150,mobile?n.height-68:52,theme,'secondary');
    if(panel===0) {
      const intro=card(n,'Stok karbon mangrove',x,y,w,mobile?190:150,theme);text(intro,'Ringkasan kawasan kajian dan pengukuran per plot.\nLokasi, periode kajian, metode dan agregasi menunggu persetujuan.',20,64,w-40,14,theme,'muted');
      const metrics=[['Rerata stok karbon','Belum dihitung','Mg C/ha'],['Rerata setara CO₂','Belum disetujui','Konversi belum dipilih'],['Kawasan kajian','Contoh kawasan','Identitas belum ditetapkan'],['Plot terukur','3','Plot contoh']];
      metrics.forEach(([label,value,unit],i)=>{const cw=mobile?w:(w-48)/4;const c=card(n,label,x+(mobile?0:i*(cw+16)),y+(mobile?214+i*140:174),cw,124,theme);text(c,value,20,54,cw-40,value==='3'?30:18,theme,'ink','Semi Bold');text(c,unit,20,94,cw-40,12,theme,'muted');});
      const yy=y+(mobile?790:330), cw=mobile?w:680;
      const c=card(n,'Komposisi stok karbon per plot',x,yy,cw,310,theme);text(c,'AGB · BGB · SOC | Mg C/ha\nDiagram komposisi menunggu data lengkap.',20,64,cw-40,14,theme,'muted');
      ['P-001','P-002','P-003'].forEach((label,i)=>{text(c,label,20,132+i*52,80,12,theme,'ink','Medium');const track=box(c,'Incomplete composition',106,134+i*52,cw-126,16,theme,'inset',4);text(track,'SOC belum tersedia',8,0,track.width-16,12,theme,'muted');});
      table(n,mobile?x:x+704,mobile?yy+334:yy,mobile?w:416,theme,['Detail plot','Status'],[['P-001','Belum lengkap'],['P-002','Belum dihitung'],['P-003','Belum dihitung']]);
      button(n,'Buka plot P-001',x,yy+(mobile?560:350),theme,'primary',undefined,mobile?'lg':'md');
    }
    if(panel===1) {
      const c=card(n,'Plot aktif · P-001',x,y,w,180,theme);text(c,'Ukuran plot · jumlah pohon · lapisan sedimen\nNilai contoh; kontrak data masih Q-04/Q-05.',20,64,w-40,14,theme,'muted');
      const yy=y+204;table(n,x,yy,w,theme,['Jenis mangrove','DBH (cm)','Tinggi (m)','ρ kayu','AGB / BGB'],[['Rhizophora sp.',16.2,'—','—','Belum dihitung'],['Jenis belum dipilih','—','—','—','Belum dihitung']]);
      button(n,'Tambah pohon · contoh',x,yy+164,theme,'secondary',undefined,mobile?'lg':'md');
      table(n,x,yy+230,w,theme,['Lapisan sedimen','Massa kering (g)','Volume (cm³)','% LOI','SOC'],[['CORE-001','—','—','—','Belum dihitung']]);
      button(n,'Tambah lapisan · contoh',x,yy+360,theme,'secondary',undefined,mobile?'lg':'md');
      notice(n,'Kolom tinggi, ρ kayu dan LOI adalah preferensi tampilan; kebutuhan ilmiahnya belum disetujui.',x,yy+430,w,theme);
      button(n,'Lihat AGB & BGB',x,yy+560,theme,'primary',undefined,mobile?'lg':'md');
    }
    if(panel===2||panel===3) {
      const labels=panel===2?['Aboveground biomass','Belowground biomass']:['Bulk density','Soil organic carbon'];
      labels.forEach((label,i)=>{const cw=mobile?w:(w-24)/2;const c=card(n,label,x+(mobile?0:i*(cw+24)),y+(mobile?i*166:0),cw,142,theme);text(c,'Metode / versi: menunggu persetujuan\nRumus referensi tidak diterapkan.',20,64,cw-40,14,theme,'muted');});
      const yy=y+(mobile?356:166);
      table(n,x,yy,w,theme,panel===2?['Jenis / pohon','DBH (cm)','ρ kayu','AGB (kg)','BGB (kg)','Karbon']:['Kedalaman (cm)','Massa kering (g)','Volume (cm³)','Bulk density','% LOI','% C','SOC'],panel===2?[['Rhizophora sp.',16.2,'—','—','—','Belum dihitung']]:[['Belum ditetapkan','—','—','—','—','—','Belum dihitung']]);
      notice(n,panel===2?'Biomassa dan karbon ditampilkan terpisah. Faktor konversi belum disetujui.':'SOC tidak dihitung tanpa data laboratorium dan metode LOI yang disetujui.',x,yy+130,w,theme);
      const subtotals=panel===2?['Stok karbon tegakan','Stok karbon akar','Total karbon biomassa']:['Total SOC profil'];
      subtotals.forEach((label,i)=>{const cw=mobile?w:panel===2?(w-32)/3:w;const c=card(n,label,x+(mobile?0:i*(cw+16)),yy+254+(mobile?i*144:0),cw,124,theme);text(c,'Belum dihitung',20,58,cw-40,18,theme,'ink','Semi Bold');text(c,'Mg C/ha · metode belum disetujui',20,96,cw-40,12,theme,'muted');});
      button(n,panel===2?'Lihat bulk density & SOC':'Lihat stok karbon total',x,yy+(mobile?254+subtotals.length*144:420),theme,'primary',undefined,mobile?'lg':'md');
    }
    if(panel===4) {
      const c=card(n,'Total stok karbon ekosistem · P-001',x,y,mobile?w:680,190,theme);text(c,'Belum lengkap',20,66,c.width-40,30,theme,'ink','Semi Bold');text(c,'SOC belum tersedia · total tidak dihitung\nSetara CO₂: metode konversi belum disetujui',20,118,c.width-40,14,theme,'muted');
      table(n,mobile?x:x+704,mobile?y+214:y,mobile?w:416,theme,['Komponen','Mg C/ha'],[['AGB karbon','Contoh / belum valid'],['BGB karbon','Contoh / belum valid'],['SOC','Belum dihitung']]);
      table(n,x,y+(mobile?430:238),w,theme,['Plot','AGB karbon','BGB karbon','SOC','Total','Setara CO₂'],[['P-001','—','—','—','Belum lengkap','Belum disetujui'],['P-002','—','—','—','Belum dihitung','Belum disetujui'],['P-003','—','—','—','Belum dihitung','Belum disetujui']]);
      button(n,'Pratinjau laporan',x,y+(mobile?680:490),theme,'secondary',undefined,mobile?'lg':'md');
      notice(n,'Pratinjau saja. Tidak ada laporan nyata atau hasil ilmiah yang dihasilkan.',x,y+(mobile?750:550),w,theme);
    }
  }
  await finishReference(page);
}
async function enrichReference(page) {
  for(const n of page.children.filter(v=>['2','3'].includes(v.getPluginData('referencePanel')))) {
    const panel=Number(n.getPluginData('referencePanel')),theme=n.getPluginData('theme'),mobile=n.width===360;
    const labels=panel===2?['Stok karbon tegakan','Stok karbon akar','Total karbon biomassa']:['Total SOC profil'];
    if(n.findOne(v=>v.name===labels[0])) continue;
    const x=mobile?24:280,w=mobile?312:1120;
    const method=n.findOne(v=>v.name===(panel===2?'Aboveground biomass':'Bulk density'));
    const yy=method.y+(mobile?356:166);
    labels.forEach((label,i)=>{const cw=mobile?w:panel===2?(w-32)/3:w;const c=card(n,label,x+(mobile?0:i*(cw+16)),yy+254+(mobile?i*144:0),cw,124,theme);text(c,'Belum dihitung',20,58,cw-40,18,theme,'ink','Semi Bold');text(c,'Mg C/ha · metode belum disetujui',20,96,cw-40,12,theme,'muted');});
    const next=n.findOne(v=>v.type==='INSTANCE'&&v.findOne(t=>t.type==='TEXT'&&t.characters===(panel===2?'Lihat bulk density & SOC':'Lihat stok karbon total')));
    if(next) next.y=yy+(mobile?254+labels.length*144:420);
  }
}
async function finishReference(page) {
  STAGE='Reference navigation';await figma.setCurrentPageAsync(page);
  const frames=page.children.filter(n=>n.getPluginData('referencePanel'));
  const panels=['Ringkasan','Input data lapangan','Perhitungan AGB & BGB','Bulk density & SOC','Stok karbon total'];
  const routes={'Buka plot P-001':1,'Lihat AGB & BGB':2,'Lihat bulk density & SOC':3,'Lihat stok karbon total':4};
  let count=0;
  for(const frame of frames) for(const n of frame.findAll(n=>n.type==='INSTANCE'||n.type==='FRAME')) {
    const label=n.type==='INSTANCE'?n.findOne(v=>v.type==='TEXT'&&v.name==='Label')?.characters:n.name;
    const theme=frame.getPluginData('theme');let to=panels.indexOf(label),nextTheme=theme;
    if(to<0&&routes[label]!==undefined) to=routes[label];
    if(label==='Dark mode'||label==='Light mode') {to=Number(frame.getPluginData('referencePanel'));nextTheme=theme==='Light'?'Dark':'Light';}
    if(to<0) continue;
    const destination=frames.find(v=>v.getPluginData('referencePanel')===String(to)&&v.getPluginData('theme')===nextTheme&&v.width===frame.width);
    STAGE=`Reference link ${++count}: ${label}`;
    await n.setReactionsAsync([{trigger:{type:'ON_CLICK'},actions:[{type:'NODE',destinationId:destination.id,navigation:'NAVIGATE',transition:null,preserveScrollPosition:false}]}]);
  }
  STAGE='Reference flow starting points';
  page.flowStartingPoints=frames.filter(n=>n.getPluginData('referencePanel')==='0').map(n=>({nodeId:n.id,name:`Ringkasan · ${n.getPluginData('theme')} · ${n.width===360?'Mobile':'Desktop'}`}));
  page.setPluginData('referenceVersion','2');page.setPluginData('dashboardReference','complete');page.selection=[frames[0]];figma.viewport.scrollAndZoomIntoView([frames[0]]);

}
async function recoverDraft(page) {
  await figma.setCurrentPageAsync(page);
  const frames=page.children.filter(n=>n.getPluginData('screenId'));
  const keys={};
  for(const n of frames) keys[`${Number(n.getPluginData('screenId').slice(4))-1}/${n.getPluginData('theme')}/${n.width===360}/${n.getPluginData('variant')}`]=n;
  const routes={'Plots':[2],'Plot map':[6],'Manager chatbot':[8],'Project examples':[11],'UI sandbox':[10], 'Open sandbox':[10],'Create plot':[3],'Explore plot map':[6],'Save measurements':[4],'Validation example':[3,'Validation'],'Correct sample input':[3],'View incomplete result':[5],'Open plot map':[6],'Export':[7],'Complete state example':[5,'Complete'],'Incomplete state example':[5],'Open plot':[5],'Back to plot':[5],'Preview dataset export':[7,'Success'],'Preview report export':[7,'Success'],'Open source plot':[5],'Open prototype sign in':[1],'View product prototype':[2],'Retry confirmation':[1,'Confirmation']};
  let linked=0;
  for(const screen of frames) {
    const index=Number(screen.getPluginData('screenId').slice(4))-1, theme=screen.getPluginData('theme'), mobile=screen.width===360, variant=screen.getPluginData('variant');
    for(const n of screen.findAll(n=>n.type==='INSTANCE'||n.type==='FRAME')) {
      const label=n.type==='INSTANCE'?n.findOne(v=>v.type==='TEXT'&&v.name==='Label')?.characters:n.name;
      let route=routes[label], destinationTheme=theme;
      if(n.name==='ThemeToggle') {route=[index,variant];destinationTheme=theme==='Light'?'Dark':'Light';}
      if(label==='Create account') route=[1,variant==='Register'?'Confirmation':'Register'];
      if(label==='Sign in'||label==='Resend confirmation') route=[2];
      if(label==='Send') route=[index,'Answer'];
      if(n.name.startsWith('Record ')||/^P-00[123]$/.test(n.name)) route=[5];
      if(!route) continue;
      const key=`${route[0]}/${destinationTheme}/${mobile}/${route[1]||'Default'}`;
      const destination=keys[key]; if(!destination) throw new Error('Missing recovery destination '+key);
      n.setPluginData('destination',key);
      STAGE='App link: '+label;
      try { await n.setReactionsAsync([{trigger:{type:'ON_CLICK'},actions:[{type:'NODE',destinationId:destination.id,navigation:'NAVIGATE',transition:null}]}]); }
      catch(error) {throw new Error('Link '+label+': '+String(error));}
      linked++;
    }
  }
  STAGE='App flow starting points';
  page.flowStartingPoints=frames.filter(n=>n.getPluginData('screenId')==='SCR-03').map(n=>({nodeId:n.id,name:`Field journey · ${n.getPluginData('theme')} · ${n.width===360?'Mobile':'Desktop'}`}));
  page.setPluginData('mangroveDesign','complete');
  STAGE='Archive earlier drafts';
  const position=figma.root.children.indexOf(page), library=figma.root.children[position-1];
  if(library.name==='Base UI · DESIGN.md'&&library.findAll(n=>n.type==='COMPONENT').length===240) library.setPluginData('mangroveDesign','complete');
  // Preserve earlier generator attempts in one archive page, including their editable layers.
  const earlier=figma.root.children.filter(p=>p!==page&&p!==library&&((p.name==='Base UI · DESIGN.md'&&p.findAll(n=>n.type==='COMPONENT').length===240)||(p.name==='App prototype · DESIGN.md'&&p.children.filter(n=>n.getPluginData('screenId')).length===76)));
  if(earlier.length) {
    const archive=figma.createPage();archive.name='Archived generator drafts';archive.setPluginData('mangroveDesign','archive');
    for(const [i,draft] of earlier.entries()) {
      const group=figma.createFrame();archive.appendChild(group);group.name=`Draft ${i+1} · ${draft.name}`;group.fills=[];group.clipsContent=false;group.resize(16000,16000);group.x=i*18000;
      for(const child of [...draft.children]) {const x=child.x,y=child.y;group.appendChild(child);child.x=x;child.y=y;}
      draft.remove();
    }
  }
  const first=keys['2/Light/false/Default'];page.selection=[first];figma.viewport.scrollAndZoomIntoView([first]);
  figma.closePlugin(`Recovered 76 editable screens, 240 components and ${linked} links; earlier drafts archived.`);
}
async function main() {
  if(figma.editorType!=='figma') throw new Error('Run this in a Figma Design file.');
  await figma.loadAllPagesAsync();
  const referenceLibrary=[...figma.root.children].reverse().find(p=>p.name==='Base UI · DESIGN.md'&&p.findAll(n=>n.type==='COMPONENT').length===240);
  if(referenceLibrary) await dashboardReference(referenceLibrary);
  if(figma.root.children.some(p=>p.getPluginData('mangroveDesign')==='complete')) {figma.closePlugin('Prototype already exists. Edit its components and screens; existing work was preserved.');return;}
  const drafts=figma.root.children.filter(p=>p.name==='App prototype · DESIGN.md'&&p.children.filter(n=>n.getPluginData('screenId')).length===76);
  if(drafts.length) { await recoverDraft(drafts[drafts.length-1]); return; }
  for(const style of ['Regular','Medium','Semi Bold']) {
    console.log('Mangrove: loading Inter '+style);
    await figma.loadFontAsync({family:'Inter',style});
  }
  console.log('Mangrove: creating components and screens');
  const library=figma.createPage();library.name='Base UI · DESIGN.md';library.setPluginData('mangroveDesign','building');await figma.setCurrentPageAsync(library);buildComponents(library);
  const page=figma.createPage();page.name='App prototype · DESIGN.md';page.setPluginData('mangroveDesign','building');await figma.setCurrentPageAsync(page);
  const starts=[];
  for(const [group,theme,mobile] of [[0,'Light',false],[1,'Dark',false],[2,'Light',true],[3,'Dark',true]]) {
    const origin=group<2?group*3800:7600+(group-2)*3400;
    text(page,`${mobile?'Mobile 360px':'Desktop 1440px'} · ${theme} · sample prototype`,0,origin,2200,36,theme,'ink','Semi Bold');
    for(let i=0;i<12;i++) {const n=screen(page,i,theme,mobile);n.x=(i%(mobile?6:4))*(mobile?440:1540);n.y=origin+100+Math.floor(i/(mobile?6:4))*(mobile?1460:1120);if(i===2) starts.push({nodeId:n.id,name:`Field journey · ${theme} · ${mobile?'Mobile':'Desktop'}`});}
    for(const [j,index,variant] of [[0,1,'Register'],[1,1,'Confirmation'],[2,3,'Validation'],[3,5,'Complete'],[4,7,'Success'],[5,8,'Answer'],[6,9,'Answer']]) {const n=screen(page,index,theme,mobile,variant);n.x=6500+(j%4)*(mobile?440:1540);n.y=origin+100+Math.floor(j/4)*(mobile?1460:1120);}
  }
  for(const {node,target} of LINKS) {
    const destination=SCREENS[target];if(!destination) throw new Error('Missing prototype destination '+target);
    await node.setReactionsAsync([{trigger:{type:'ON_CLICK'},actions:[{type:'NODE',destinationId:destination.id,navigation:'NAVIGATE',transition:null}]}]);
  }
  if(Object.keys(SCREENS).length!==76) throw new Error('Incomplete screen set');
  if(Object.keys(COMPONENTS).length-1!==240) throw new Error('Incomplete Base UI component set');
  for(const n of Object.values(SCREENS)) {
    if(![360,1440].includes(n.width)) throw new Error('Incorrect screen width: '+n.name);
    if(n.findAll(v=>v.type==='TEXT').some(v=>v.fontName.family!=='Inter')) throw new Error('Unexpected typeface');
  }
  page.flowStartingPoints=starts;
  library.setPluginData('mangroveDesign','complete');page.setPluginData('mangroveDesign','complete');
  const first=SCREENS['2/Light/false/Default'];page.selection=[first];figma.viewport.scrollAndZoomIntoView([first]);
  await dashboardReference(library);
  figma.closePlugin(`Created ${Object.keys(SCREENS).length} editable frames, ${Object.keys(COMPONENTS).length-1} components and ${LINKS.length} prototype links.`);
}
main().catch(error=>{
  const message='Prototype generator stopped at '+STAGE+': '+String(error);
  console.error(message);
  try {text(figma.currentPage,message,-1800,-100,1600,14,'Light');} catch {}
  figma.closePlugin(message);
});
