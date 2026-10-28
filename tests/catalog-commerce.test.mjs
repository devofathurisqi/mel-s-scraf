import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {cleanCart,clampQuantity,cartSummary,orderMessage,whatsappUrl} from '../src/commerce.ts';
import {config} from '../src/config.ts';
import {initialProductPhoto,productPhotos} from '../src/product-photos.ts';
const load=name=>JSON.parse(readFileSync(new URL('../src/data/'+name,import.meta.url),'utf8'));
const products=load('products.json'),prices=load('prices.json'),retail=load('retail-prices.json');
const line=(p,n=1,v=p.variants[0].id)=>({productId:p.id,variantId:v,quantity:n});

test('catalog prices follow this brand’s exact authorized source',()=>{
 assert.equal(products.length,config.key==='ameraah'?7:27);
 assert.equal(new Set(products.map(p=>p.id)).size,products.length);
 assert.equal(new Set(products.map(p=>p.slug)).size,products.length);
 if(config.key==='ameraah')assert.deepEqual(prices,{'modal-viscose':48000,'viscose-gradasi':57000,'paris-legend':25000,'hayla-khiban':40000,'inner-tali':17000,'zea-sport-instan':37000,'pashmina-airflow':47000});
 else assert.deepEqual(prices,{});
 for(const p of products){const expected=prices[p.id]??retail[p.id]??null;assert.equal(p.retailPrice,expected,p.id);assert.equal(p.pricingSource,config.key==='ameraah'?'brand':expected===null?'unresolved':'retail');assert.equal(p.pricingStatus,expected===null?'inquiry':'verified');assert.equal(p.availabilityStatus,'confirm');}
});

test('every product photo, model example, shade and responsive derivative exists',()=>{
 for(const p of products){assert.equal(new Set(p.variants.map(v=>v.id)).size,p.variants.length,p.id);for(const im of [...p.images,...(p.modelImages||[]),...(p.referenceImages||[]),...p.variants.map(v=>v.image),...(p.legacyVariants||[]).map(v=>v.image)])for(const w of ['','-360','-640','-960'])assert.ok(existsSync(new URL('../public/assets/images/'+im.replace('.webp',w+'.webp'),import.meta.url)),im);}
 assert.ok(existsSync(new URL('../public/assets/brand/official-logo.jpeg',import.meta.url)));
});

test('all shades are orderable with their exact names and current prices',()=>{
 for(const p of products)for(const v of p.variants){const cart=[line(p,2,v.id)];assert.deepEqual(cleanCart(cart,products),cart);assert.ok(orderMessage(cart,products).includes('Varian: '+v.name));assert.equal(cartSummary(cart,products).subtotal,p.retailPrice===null?0:p.retailPrice*2);}
});

test('cart merges duplicate colors, preserves different colors and drops invalid saved data',()=>{
 const p=products.find(p=>p.id==='viscose-gradasi');const cart=cleanCart([line(p,2),line(p,3),line(p,1,p.variants[1].id),null,{},line(p,1,'invalid'),{productId:'removed',variantId:'x',quantity:1}],products);assert.equal(cart.length,2);assert.equal(cart[0].quantity,5);assert.deepEqual(cleanCart(null,products),[]);for(const n of [null,-1,'bad',0])assert.equal(clampQuantity(n),1);assert.equal(clampQuantity(999),99);assert.equal(clampQuantity(2.8),2);
});

test('WhatsApp orders target only this brand and preserve quantities, totals and customer text',()=>{
 const p=products.find(p=>p.id==='viscose-gradasi'),cart=[line(p,3,p.variants[2].id)],before=JSON.stringify(cart);const message=orderMessage(cart,products,{name:'Dewi & Putri',notes:'Warna ♥ + pilihan?'}),url=new URL(whatsappUrl(message));assert.equal(url.origin,'https://wa.me');assert.equal(url.pathname,config.key==='ameraah'?'/6281533330018':'/6281315344182');assert.equal(url.searchParams.get('text'),message);assert.ok(message.includes(config.brand));assert.ok(message.includes(p.variants[2].name));assert.match(message,/Jumlah: 3 pcs/);assert.ok(message.includes('Warna ♥ + pilihan?'));assert.equal(cartSummary(cart,products).subtotal,p.retailPrice*3);assert.equal(JSON.stringify(cart),before);
});

test('inquiry prices remain explicit and never become free or included in totals',()=>{
 const pending=products.find(p=>p.retailPrice===null);if(!pending)return;const p=products.find(p=>p.retailPrice!==null&&p.variants.length),cart=[line(p,2),line(pending,3)],summary=cartSummary(cart,products);assert.equal(summary.subtotal,p.retailPrice*2);assert.equal(summary.pending,3);assert.match(orderMessage(cart,products),/3 pcs dengan harga konfirmasi belum termasuk subtotal/);assert.match(orderMessage([line(pending)],products),/Subtotal: menunggu konfirmasi harga/);
});

test('model examples remain accessible when selecting a fabric or chart shade',()=>{
 for(const p of products.filter(p=>p.modelImages?.length))for(const v of p.variants){const photos=productPhotos(p,v);assert.ok(photos.includes(v.image));for(const im of p.modelImages)assert.ok(photos.includes(im));assert.equal(initialProductPhoto(p,v),p.modelImages[0]);assert.equal(initialProductPhoto(p,v,true),v.image);}
 const ciput=products.find(p=>p.id==='inner-tali');assert.deepEqual(ciput.images,[]);assert.deepEqual(ciput.variants,[]);
});

test('brand storage is isolated and catalog contains no supplier costs or another store identity',()=>{
 assert.ok(config.storageKey.startsWith(config.key+'-'));assert.ok(config.favoritesKey.startsWith(config.key+'-'));assert.doesNotMatch(JSON.stringify(products),/costPrice|internalCost|wholesalePrice|margin|SUGARSHAWL|ROONA|RUMEA/);assert.throws(()=>orderMessage([],products),/kosong/);
});
