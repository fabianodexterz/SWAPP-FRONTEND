
"use client";
import Image from "next/image";
type Props = { name:string; description:string; iconUrl?:string };
export default function SkillCard({ name, description, iconUrl }: Props){
  return (
    <div className="skill-card">
      <Image src={iconUrl || "/images/skills/placeholder.png"} alt={name} width={48} height={48}/>
      <div>
        <div className="sw-title" style={{fontSize:".95rem"}}>{name}</div>
        <p style={{opacity:.9,lineHeight:1.25,fontSize:".9rem"}}>{description || "ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡ÃƒÂ¯Ã‚Â¿Ã‚Â½"}</p>
      </div>
    </div>
  );
}
