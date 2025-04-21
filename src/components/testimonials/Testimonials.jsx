import { testimonialsData } from "@libs/constants";

const Testimonials = () => {
  return (
    <section className="py-[80px] text-center">
      <h2 className="mb-[30px] text-[32px] font-bold text-[#8a4baf]">
        What our students say?
      </h2>
      <div className="flex flex-wrap justify-center gap-[30px]">
        {testimonialsData.map(({ id, name, position, message, image }) => (
          <div
            className="flex w-[300px] flex-col items-center rounded-[10px] bg-white p-[20px] text-left shadow-sm"
            key={id}
          >
            <div className="mb-6 h-20 w-20 overflow-hidden rounded-full object-cover">
              <img src={image} alt={name} />
            </div>
            <p className="mb-3 text-lg text-[#333]">{message}</p>
            <div className="text-center">
              <h3 className="text-4 mb-[5px] font-bold text-[#8a4baf]">
                {name}
              </h3>
              <p className="text-sm text-[#666]">{position}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default Testimonials;
