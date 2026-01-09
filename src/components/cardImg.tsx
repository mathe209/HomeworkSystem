interface CardImgProps {
    source: string;
}

export default function CardImg({source}: CardImgProps) {
    return(
        <div >
            <img src={source} alt="" className="w-full h-64 object-fill" />
        </div>
    )
}
    