import { useState } from "react";
import useCheckPlayer from "./useCheckPlayer";
import useCheckAttributes from "./useCheckAttributes";

interface IPlayerResponse {
    exist: boolean
    error?: string
}

interface IFunctionCheckPlayerResponse {
    validPlayer: boolean
    error?: string
}

interface IFunctionCheckAttributesResponse {
    validAttributes: boolean
    error?: string
}

const usePlayer = () => {
    const { checkPlayer } = useCheckPlayer();
    const { checkAttributes } = useCheckAttributes();

    const [uuid, setUuid] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [health, setHealth] = useState<number>(0);
    const [defense, setDefense] = useState<number>(0);
    const [money, setMoney] = useState<number>(0);
    const [level, setLevel] = useState<number>(0);
    const [exp, setExp] = useState<number>(0);
    
    const functionCheckAttributes = async(id: string): Promise<IFunctionCheckAttributesResponse> => {
        console.log(id, "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
        const {valid, data, error} = await checkAttributes(id)
        if (valid) {
            setHealth(data.health)
            setDefense(data.defense)
            setLevel(data.level)
            setMoney(data.money)
            setExp(data.exp)
            return {validAttributes: true}
        } else {
            return {validAttributes: false, error: error}
        }
    }

    const functionCheckPlayer = async(email: string): Promise<IFunctionCheckPlayerResponse> =>{
        const {valid, data, error} = await checkPlayer(email)
        if (valid && data.name) {
            setUuid(data.id)
            setName(data.name)
            const {validAttributes, error } = await functionCheckAttributes(data.id)
            if (validAttributes) {
                return {validPlayer: true}
            } else {
                return {validPlayer: false, error: error}
            }
        } else {
            return {validPlayer: false, error: error}
        }
    }

    const player = async (email: string): Promise<IPlayerResponse> => {
        const {validPlayer, error} = await functionCheckPlayer(email)
        if (validPlayer) {
            return {exist: true}
        } else {
            return {exist: false, error: error} 
        }
    }
    return {player, uuid, name, health, defense, money, level, exp}
}

export default usePlayer