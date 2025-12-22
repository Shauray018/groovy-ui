"use client"

import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { useState } from 'react';
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function SocialButtons() {
    const [stars, setStars] = useState<number | null>(null);

    useEffect(() => { 
        const fetchStars = async () => { 
            try { 
                const res = await fetch( 
                    "https://api.github.com/repos/Shauray018/groovy-ui", 
                    {
                        headers: { 
                            Accept: 'application/vnd.github+json'
                        }
                    }
                )

                const data = await res.json(); 
                setStars(data.stargazers_count)
            } catch (err) { 
                console.error("failed to fetch repo stars", err)
            }
        }; 
        
        fetchStars();
    },[])

  return (
    <div className="flex items-center gap-2 px-8 ">
      <Button 
        variant="ghost" 
        size="icon"
        className="cursor-pointer "
      >
        <FaXTwitter className="h-5 w-5" />
      </Button>
      

      <Button 
        variant="ghost" 
        className=" cursor-pointer"
      >
        <div className='flex justify-center items-center  h-full w-full'>
        <FaGithub className="h-6 w-6" />
        </div>
        <div className='flex justify-center items-center h-full w-full'>
            <span className="text-md font-medium">{stars ?? '—'}</span>
        </div>
      </Button>
    </div>
  );
}