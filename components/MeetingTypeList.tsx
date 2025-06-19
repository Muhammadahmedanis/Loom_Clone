'use client'

import { useState } from "react";
import HomeCard from "./HomeCard"
import { useRouter } from "next/navigation";
import MeetingModel from "./MeetingModel";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { toast } from "sonner";
import { Textarea } from "./ui/textarea";
import ReactDatePicker from "react-datepicker";
import { Input } from "./ui/input";

export default function MeetingTypeList() {
    const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>();
    const router = useRouter();
    const[values, setValues] = useState({
      dateTime: new Date(),
      description: '',
      link: '',
    })
    const[callDetails, setCallDetails] = useState<Call>()

    const { user } = useUser();
    const client = useStreamVideoClient()

    const createMeeting = async() => {
      if(!client || !user) return;

      try {
        if(!values.dateTime) {
          toast.error("Please select a date and time");
          return;
        }

        const id = crypto.randomUUID();
        const call = client.call('default', id);
        if(!call) throw new Error("Failed to create call");
        
        const startAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
        const description = values.description || "Instant meeting";
        await call.getOrCreate({
          data: {
            starts_at: startAt,
            custom: {
              description
            }
          }
        })
        setCallDetails(call);
        if(!values.description){
          router.push(`/meeting/${call.id}`)
        }
        toast.success("Meeting Created");
      } catch (error) {
        toast.error("Failed to create meeting");
        console.log(error);
      }
    }

    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`
    
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
       <HomeCard img='icons/add-meeting.svg' title="New Meeting" description="Start an instant meeting" handleClick={() => setMeetingState('isInstantMeeting')} className="bg-[var(--orange-1)]" />
       
       <HomeCard img='icons/schedule.svg' title="Schedule Meeting" description="Plan your meeting" handleClick={() => setMeetingState('isScheduleMeeting')} className="bg-[var(--color-blue-1)]" />
       
       <HomeCard img='icons/recordings.svg' title="View Recording" description="Check out your recordings" handleClick={() => router.push('/recordings')} className="bg-[var(--purple-1)]" />
       
       <HomeCard img='icons/join-meeting.svg' title="Join Meeting" description="Via invititation link" handleClick={() => setMeetingState('isJoiningMeeting')} className="bg-[var(--yellow-1)]" />

      {
        !callDetails ?
        ( 
          <MeetingModel 
            isOpen={meetingState === "isScheduleMeeting"} 
            onClose={() => setMeetingState(undefined)} 
            title='Create meeting'  
            handleClick={createMeeting}
           >
            <div className="flex flex-col gap-2.5">
              <label className="text-base text-normal leading-[22px] text-[var(--sky-1)]">Add a description</label>
              <Textarea className="border-none bg-[var(--color-dark-2)] focus-visible:ring-0 focus-visible:ring-offset-0" onChange={(e) => setValues({...values, description: e.target.value})} />
            </div>
            <div className="flex w-full flex-col gap-2.5">
              <label className="text-base text-normal leading-[22px] text-[var(--sky-1)]">Select Date and Time</label>
              <ReactDatePicker 
                selected={values.dateTime} 
                onChange={(date) => setValues({...values, dateTime: date! })} 
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat='MMMM d, yyyy h:mm aa'
                className="w-full rounded bg-[var(--color-dark-2)] px-3 py-2 focus:outline-none" 
              />
            </div>
           </MeetingModel>
        ) :
        (
          <MeetingModel 
             isOpen={meetingState === "isScheduleMeeting"} 
             onClose={() => setMeetingState(undefined)} 
             title='Meeting Created'  
             className="text-center"
             handleClick={() => {
              navigator.clipboard.writeText(meetingLink);
              toast.success("Link copied");
            }}
            img='/icons/checked.svg'
            buttonIcon='/icons/copy.svg'
            buttonText='Copy Meeting Link'
          />
        )
      }
        <MeetingModel 
          isOpen={meetingState === "isInstantMeeting"} 
          onClose={() => setMeetingState(undefined)} 
          title='Start an instant meeting'  
          className="text-center"
          buttonText="Start Meeting"
          handleClick={createMeeting}
        />

        <MeetingModel 
          isOpen={meetingState === "isJoiningMeeting"} 
          onClose={() => setMeetingState(undefined)} 
          title='Type the link here'  
          className="text-center"
          buttonText="Join Meeting"
          handleClick={() => router.push(values.link)}
        >
          <Input placeholder="Meeting Link" className="border-none bg-[var(--color-dark-2)] rounded focus-visible:ring-0 focus-visible:ring-offset-0" onChange={(e) => setValues({...values, link: e.target.value})} />
        </MeetingModel>

    </section>
  )
}
