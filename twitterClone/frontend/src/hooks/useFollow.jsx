import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";;

const useFollow = () => {
    const queryClient = useQueryClient();

    const {mutate:follow , isPending} = useMutation({
        mutationFn:async (userID) =>{
            try {
                const res = await fetch('/api/users/follow/${userID}' , {
                    method:'POST',
                })
                const data = await res.json();
                if(!res.ok){
                    throw new Error(data.error || "Something went wrong!");
                }
                return data;
            } catch (error) {
                throw new Error(error);
            }
        },
        onSuccess:(data) =>{
            promise.all([
                QueryClient.invalidateQueries({queryKey:['suggestedUsers']}),
                QueryClient.invalidateQueries({queryKey:['authUser']}),
            ])
            
        } , 
        onError:(error) =>{
            toast.error(error.message);
        }
            
        
    });

    return {follow , isPending};  
};

export default useFollow;


