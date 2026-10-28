import {Link} from 'react-router-dom';
import {ArrowRight,ArrowUpRight} from 'lucide-react';
import {Logo} from '../components/Layout';
import {ShoppingSteps} from '../App';
import {whatsappUrl} from '../commerce';
import {config} from '../config';
export default function About(){return <><section className="about-hero section"><div><span className="eyebrow">A NOTE FROM MEL’S SCRAF</span><h1>Sentuhan lembut.<br/><em>Cerita tentangmu.</em></h1><p>Softly Wrapped, Beautifully You. Mel’s Scraf adalah ruang kecil untuk menemukan warna, motif, dan siluet yang terasa dekat dengan dirimu. Lavender yang lembut dari identitas kami menjadi awal untuk menemukan warna favoritmu sendiri.</p><p>Dari pashmina dan segi empat hingga khimar dan mukena, setiap pilihan bisa menjadi bagian dari ceritamu. Lihat koleksi lebih dekat, bandingkan warna, dan simpan yang kamu suka. Kami siap membantu memastikan detailnya melalui WhatsApp.</p><Link to="/koleksi" className="button">Jelajahi koleksi <ArrowRight size={18}/></Link></div><div className="about-identity"><Logo/><p>{config.tagline}</p><a className="text-link" href={whatsappUrl(`Halo ${config.brand}, saya ingin bertanya tentang koleksi.`)} target="_blank" rel="noreferrer">Sapa Mel’s Scraf <ArrowUpRight size={18}/></a></div></section><ShoppingSteps/></>;}
