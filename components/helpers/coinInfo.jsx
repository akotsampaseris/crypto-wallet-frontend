export default function CoinInfo(coin){
    const coins = [
        {
            "id": "btc",
            "name": "Bitcoin",
            "logo": "https://cdn-icons-png.flaticon.com/512/5968/5968260.png"
        },
        {
            "id": "eth",
            "name": "Ethereum",
            "logo": "https://cdn-icons-png.flaticon.com/512/7016/7016523.png"
        },
    ]

    var result = coins.find(obj =>{
        return obj.id == coin
    })

    return result
}