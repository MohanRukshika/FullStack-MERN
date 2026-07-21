export default function Product(props){
    return(
        <div className="bg-blue-100 border w-70 " >
            <h1 className="text-xl">{props.name}</h1>
            <img className="w-80" src={props.image}/>
            <p>{props.price}</p>
            <button>Buy Now</button>
        </div>
    )
}