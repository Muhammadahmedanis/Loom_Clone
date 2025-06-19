import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useEffect, useState } from "react"

export const useGetCalls = () => {
    const [calls, setCalls] = useState<Call[]>([]);
    const client = useStreamVideoClient();
    const [loading, setLoading] = useState(false);
    const { user } = useUser();

    useEffect(() => {

        const loadCall = async () => {
            if(!client || !user?.id) return;
            setLoading(true);

            try {
                const { calls } = await client.queryCalls({
                    sort: [ { field: 'starts_at', direction: -1} ],
                    filter_conditions: {
                        starts_at: { $exists: true },
                        $or: [
                            { created_by_user_id: user.id},
                            { members: { $in: [user.id] } }
                        ]
                    }
                })
                setCalls(calls);
            } catch (error) {
                console.log(error);
            } finally{
                setLoading(false);
            }    
        };

        loadCall();
    }, [client, user?.id]);

    const now = new Date();

    const endedCalls = calls.filter(({ state: { startsAt, endedAt } }) => {
        return startsAt && new Date(startsAt) < now || !!endedAt ;
    });

    const upComingCalls = calls.filter(({ state: { startsAt, endedAt } }) => {
        return startsAt && new Date(startsAt) > now || !!endedAt ;
    });

    return {
        upComingCalls, endedCalls, callRecordings: calls, loading
    }

}