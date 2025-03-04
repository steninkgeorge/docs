export const Ruler =()=>{

    const marker= Array.from({length: 83}, (_, i) => i)

    return (
      <div className=" h-6 flex items-end border-gray-300 border-b select-none print:hidden">
        <div
          id="ruler-container"
          className="relative max-w-[816px] h-full w-full mx-auto  "
        >
          <div className="absolute inset-x-0 bottom-0 h-full">
            <div className="relative h-full w-[816px]">
              {marker.map((marker) => {
                const pos = (816 * marker) / 82;
                return (
                  <div
                    key={marker}
                    className="absolute bottom-0"
                    style={{ left: `${pos}px` }}
                  >
                    {marker % 10 === 0 && (
                      <>
                        <div className="h-2 w-[1px] bg-neutral-500 absolute bottom-0 " />
                        <span className="absolute bottom-2 text-[10px] text-neutral-500 -translate-x-1/2">{marker / 10 + 1}</span>
                      </>
                    )}
                    {marker % 5 === 0 && marker % 10 !== 0 && (
                        <div className="h-1.5 w-[1px] bg-neutral-500 absolute bottom-0" />
                    )}
                    {marker % 5!==0 && (
                        <div className="h-1 w-[1px] bg-neutral-300 absolute bottom-0" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
}