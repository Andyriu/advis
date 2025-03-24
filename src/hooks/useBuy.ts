import useObject from "./useObject";
import usePlayer from "./usePlayer"

interface IbuyResponse {
    success: boolean
    message?: string
    error?: string
}

const useBuy = () => {
    const {money, uuid} = usePlayer();
    const {object} = useObject()

    const buy = async (object_id: number): Promise<IbuyResponse> => {
        const { exist, data, error } = await object(object_id);
        if (!exist) {
            return {success: exist, error: error}
        } else {
            if (money >= data.object_price) {
                const moneyUp = money - data.object_price
                const response = await fetch('/api/buyObject',{
                    method: "POST",
                headers: {
                "content-Type": "application/json",
                },
                body: JSON.stringify({ uuid, object_id: data.object_id, moneyUp })
                })
                const {success, error} = await response.json()
                if (success) {
                    return {success: success, message: `El objeto ${data.object_name} ha sido comprado`}
                } else {
                    return {success: success, error: error}
                }
            }
        }
    }

    return {buy}
}

export default useBuy