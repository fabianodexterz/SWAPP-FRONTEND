'use client'
import { create } from 'zustand'
type User={ id:number; email:string; name:string }
type State={ user:User|null, token:string|null }
type Actions={ hydrate:()=>void; login:(token:string,user:User)=>void; logout:()=>void }
export const useAuth=create<State & Actions>((set)=>({ user:null, token:null, hydrate:()=>{ const t=typeof window!=='undefined'?localStorage.getItem('token'):null; const u=typeof window!=='undefined'?JSON.parse(localStorage.getItem('user')||'null'):null; set({ token:t, user:u }) }, login:(t,u)=>{ localStorage.setItem('token',t); localStorage.setItem('user',JSON.stringify(u)); set({ token:t, user:u }) }, logout:()=>{ localStorage.removeItem('token'); localStorage.removeItem('user'); set({ token:null, user:null }) } }))
