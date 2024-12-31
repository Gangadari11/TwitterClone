import Notification from '../models/notification.model.js';

export const getNotifications = async (req, res) => {
    try {
        const userID = req.user._id;
        const notifications = await Notification.find({to: userID}).populate({
            path: 'from',
            select: 'username profileImg'
        })
        .sort({createdAt: -1});
        await Notification.updateMany({to:userID} , {read:true}); 
        res.status(200).json({notifications});
    } catch (error) {
        console.log("Error in getNotifications function: ", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
};

export const deleteNotifications = async (req, res) => {
    try {
        const userID = req.user._id;
        await Notification.deleteMany({to:userID});
        res.status(200).json({message: "Notifications deleted successfully"});
    }catch(error){
        console.log("Error in deleteNotifications function: ", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
};

// export const deleteNotification = async (req, res) => {
//     try{
//         const notificationID = req.params.id;
//         const userID = req.user._id;
//         const notification = await Notification.findById(notificationID);
//         if(!notification){
//             return res.status(404).json({error: "Notification not found"});
//         }
//         if(notification.to.toString() !== userID.toString()){
//             return res.status(403).json({error: "You are not allowed to delete this notification"});
//         }
//         await Notification.findByIdAndDelete(notificationID);
//         res.status(200).json({message: "Notification deleted successfully"});
//     }catch(error){
//         console.log("Error in deleteNotification function: ", error.message);
//         res.status(500).json({error: "Internal Server Error"});
//     }
// };