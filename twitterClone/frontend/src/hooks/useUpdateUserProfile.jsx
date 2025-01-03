import {useMutation , useQueryClient} from 'react-query';
import toast from 'react-hot-toast';

const useUpdateUserProfile = () => {
    const queryClient = useQueryClient();
    const {mutateAsync:updateProfile , isPending:isUpdateProfile } = useMutation({
        
		mutationFn: async(formData) => {
			try{
			    const res = await fetch('/api/users/update',{
					method: 'POST',
					headers: {
					    "Content-Type": "application/json",

					},
					body: JSON.stringify({formData}),
					   
					
				})
				const data = await res.json();
				if(!res.ok){
				    throw  new Error(data.error || "Something went wrong");
				}
				return data;
			}catch(error){
				throw new Error(error);
			}
		},
		onSuccess: () => {
			toast.success("Profile updated successfully");
			Promise.all([
				queryClient.invalidateQueries({queryKey: ['authUser']}),
				queryClient.invalidateQueries({queryKey: ['userProfile']}),
			])
		},
		onError: (error) => {
			toast.error(error.message);
		}
	})
    return {updateProfile , isUpdateProfile};


};

export default useUpdateUserProfile;