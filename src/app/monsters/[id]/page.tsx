
import Image from "next/image";
import Link from "next/link";
import SkillCard from "../components/SkillCard";

type Skill = { name: string; description: string; iconUrl?: string };
type AwakeningCost = { type: string; qty: number };
type Monster = {
  id: number;
  name: string;
  element: "Fire" | "Water" | "Wind" | "Light" | "Dark";
  archetype?: "Attack" | "Defense" | "HP" | "Support";
  natStars?: number;
  awakened?: boolean;
  portraitUrl?: string | null;
  swarfarmId?: number | null;
  stats?: { hp?: number; atk?: number; def?: number; spd?: number };
  skills?: Skill[];
  awakening?: { cost?: AwakeningCost[] };
};

async function getMonster(id: string): Promise<Monster | null> {
  try{
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/monsters/${id}`, { cache: "no-store" });
    if(!res.ok) throw new Error("fetch failed");
    return await res.json();
  }catch{
    return null;
  }
}

const elementMeta: Record<string, {label:string, icon:string, klass:string}> = {
  Fire:  { label: "Fire",  icon: "/elements/fire.svg",  klass:"el-fire"  },
  Water: { label: "Water", icon: "/elements/water.svg", klass:"el-water" },
  Wind:  { label: "Wind",  icon: "/elements/wind.svg",  klass:"el-wind"  },
  Light: { label: "Light", icon: "/elements/light.svg", klass:"el-light" },
  Dark:  { label: "Dark",  icon: "/elements/dark.svg",  klass:"el-dark"  },
};

export default async function MonsterDetail({ params }: { params: { id: string }}) {
  const data = await getMonster(params.id);
  if(!data){
    return (
      <div className="sw-card" style={{padding:"1.1rem"}}>
        <div className="sw-title" style={{fontSize:"1.05rem"}}>Monstro não encontrado</div>
        <p style={{opacity:.9}}>Verifique sua API em <code>/api/monsters/{params.id}</code>.</p>
        <Link href="/monsters" style={{color:"#f4d389"}}>Voltar para a lista</Link>
      </div>
    );
  }
  const el = elementMeta[data.element] || elementMeta.Fire;
  const stars = Array.from({length: data.natStars || 0}).map((_,i)=>(<span key={i} className="star">★</span>));
  return (
    <div className="sw-card" style={{padding:"1rem 1.2rem"}}>
      <div className="monster-sheet">
        <div className="portrait">
          <Image src={data.portraitUrl || "/images/monsters/placeholder.png"} alt={data.name} width={140} height={140} style={{objectFit:"cover"}}/>
        </div>
        <div className="header">
          <div className="sw-title" style={{fontSize:"1.25rem"}}>{data.name}</div>
          <div style={{display:"flex", gap:".5rem", flexWrap:"wrap", alignItems:"center"}}>
            <span className={`sw-chip gold`}>{stars}</span>
            <span className={`el-chip ${el.klass}`}>
              <Image src={el.icon} alt={el.label} width={18} height={18}/>
              {el.label}
            </span>
            {data.archetype && <span className="sw-chip">{data.archetype}</span>}
            {data.awakened && <span className="sw-chip" style={{color:"#6fcf97"}}>Awakened</span>}
            {data.swarfarmId && <span className="sw-chip">SWF: {data.swarfarmId}</span>}
          </div>
        </div>
      </div>

      <div className="section">
        <h3>Stats Base</h3>
        <div className="stats-grid">
          <div className="stat-box">HP<br/><b>{data.stats?.hp ?? "—"}</b></div>
          <div className="stat-box">ATK<br/><b>{data.stats?.atk ?? "—"}</b></div>
          <div className="stat-box">DEF<br/><b>{data.stats?.def ?? "—"}</b></div>
          <div className="stat-box">SPD<br/><b>{data.stats?.spd ?? "—"}</b></div>
        </div>
      </div>

      <div className="section">
        <h3>Habilidades</h3>
        <div className="skill-grid">
          {(data.skills && data.skills.length>0) ? data.skills.map((s,i)=>(
            <SkillCard key={i} name={s.name} description={s.description} iconUrl={s.iconUrl}/>
          )) : (
            <div style={{opacity:.8}}>Sem habilidades cadastradas.</div>
          )}
        </div>
      </div>

      <div className="section">
        <h3>Awakening</h3>
        <div className="awk-grid">
          {data.awakening?.cost?.length ? data.awakening.cost.map((c,i)=>(
            <span key={i} className="awk-pill">{c.qty}× {c.type}</span>
          )) : <div style={{opacity:.8}}>Sem dados de awakening.</div>}
        </div>
      </div>

      <div style={{marginTop:"1rem"}}>
        <Link href="/monsters" style={{color:"var(--sw-gold-2)"}}>← Voltar à lista</Link>
      </div>
    </div>
  );
}
