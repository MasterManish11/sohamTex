import Link from 'next/link';

export function Docs() {
  return (
    <div className="bg-[#1f2937] text-white overflow-y-hidden rounded">
      <h2 className="mb-5 pt-2 pl-14 text-3xl font-medium min-h-full ">About us</h2>
      <section className="mb-16 px-3 py-8 md:px-8">
        <ul className="mt-2 list-disc pl-6">
          <li className="mb-4">
            Established in the year 2001, we, Soham Industrial Machinery Ltd., are involved in
            Incense Stick Making Machines. The entire product line stands in compliance with the set
            industry quality guidelines. Besides this, our products are acclaimed in the market for
            their supreme quality, reliability, tear resistance, sturdy construction and
            cost-effective prices.
          </li>
          <li className="mb-4">
            Assisted by a qualified and experienced team of professionals, we have been able to
            provide top quality products to our esteemed clients, located across the globe. Sourced
            from authentic vendors, premium quality raw material is used for manufacturing our
            product range. Our product range include Automatic Agarbatti Making Machine, Automatic
            Incense Making Machine, Incesne Stick Making Machine. Moreover, our capacious warehouse
            is installed with all the latest tools and machines, so as to keep our range safe. Our
            clients can also avail from us the facility to pay through varied payment modes.
          </li>
          <li className="mb-4">
            Led under the guidance of our mentor, Mr. Kishor Kapadiya, we have gained a remarkable
            position in the market. His in-depth industry knowledge and ethical business dealing
            have enabled us to muster a wide client base across the market. We are exporting in the
            following countries Srilanka, Australia, America, South Africa, Bangladesh, Nepal,
            Indonasia.
          </li>
        </ul>
        <Link className="px-4 py-2 rounded-md bg-slate-500 ml-4"  target="_blank" href="https://www.sohammachines.com/">View More</Link>
      </section>
    </div>
  );
}
