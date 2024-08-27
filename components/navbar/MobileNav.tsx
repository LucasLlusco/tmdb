import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from 'lucide-react'
import { Separator } from "@/components/ui/separator"

const MobileNav = () => {

  return (
    <Sheet>
      <SheetTrigger><Menu/></SheetTrigger>
      <SheetContent side={"left"}>
        <div className="flex flex-col gap-3">
          <a href="/">Movies</a>
          <a href="/">Tv series</a>  
        </div>
        <Separator className='my-4' />
        <div className="flex flex-col gap-3">
          <a href="/">Sign in</a>
          <a href="/">Sign up</a>  
          <a href="/">Logout</a>  
        </div>

          {/* <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </SheetDescription>
          </SheetHeader> */}
      </SheetContent>
    </Sheet>
  )
}

export default MobileNav