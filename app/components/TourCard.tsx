import Link from "next/link";

type Props = {
  id: string;
  title: string;
  image: string;
  price: number;
};

export default function TourCard({ id, title, image, price }: Props) {
  return (
    <Link href={`/tours/${id}`}>
      <div className="group relative h-[320px] rounded-3xl overflow-hidden shadow-xl cursor-pointer">
        <img
          src={image}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          alt={title}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="absolute bottom-0 p-5 text-white">
          <h3 className="text-xl font-bold">{title}</h3>
          <span className="inline-block mt-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur text-sm">
            от €{price}
          </span>
        </div>
      </div>
    </Link>
  );
}
