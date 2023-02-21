import { useState } from "react";
import ComponentHeader from "./componentHeader";

export default function SimpleChart() {

    const [dropDown, setDropDown] = useState(false);
    let datafor_mychart = [
        {
            color: "#895BF1",
            title: "Business",
            count: "224",
            perc: 0
        },
        {
            color: "#F3654A",
            title: "Travel",
            count: "245",
            perc: 0
        },
        {
            color: "#0A94FF",
            title: "Design",
            count: "251",
            perc: 0
        },
        {
            color: "#DC60EF",
            title: "Finance",
            count: "763",
            perc: 0
        },
        {
            color: "#99B2C6",
            title: "Material",
            count: "1775",
            perc: 0
        }]

    calculation_perce(datafor_mychart)
    function calculation_perce(collection: any) {
        let material_count = collection.find(item => item.title == "Material").count;

        for (const item of datafor_mychart) {
            if (item.title != "Material")
                item.perc = +item.count * 360 / material_count
        }
    }

    function percentage(collection: any) {
        let sum = collection.reduce((sum, item) => (item.title == "Material" ? sum : sum + +item.count), 0)
        let material_count = collection.find(item => item.title == "Material").count;
        return Math.round(sum * 100 / material_count)
    }
    let start_deg = 270

    return (
        <div
            className="bg-light-solidcolor-extra-cardbackground rounded-md shrink-0 mt-4 w-[1155px] h-full relative"
            style={{
                boxShadow:
                    'var(--light-gray-card-box-shadow,  0px 4px 18px 0px rgba(75, 70, 92, 0.10))',
            }}
        >
             <ComponentHeader
        title={'Simple Chart'}
        dropDownActive={dropDown}
        setDropDown={setDropDown}
      />
            <div className=" flex flex-col justify-start
    relative m-8 w-[330px] h-[511px] 
   bg-[#FFFFFF] border border-[#F3654A] rounded-[12px]" >

                <p className={` mt-[23px] ml-[25px] 
     w-[117px] h-[24px] text-[#050505] font-['Alef']
      not-italic font-[400] text-[20px] leading-6`}>
                    Simple Chart
                </p>
                <div className=" mb-5 relative h-[200px] w-full flex justify-center items-center">
                    {datafor_mychart.map((item, i) => {
                        start_deg += item.perc - 2;
                        return <div style={{
                            zIndex: i,
                            height: 170 + i * 20 + "px",
                            width: 170 + i * 20 + "px",
                            transform: `rotate(${start_deg - item.perc}deg)`,
                            background: `conic-gradient( ${item.color}  ${item.perc}deg,
             rgba(0, 0, 0, 0) 0deg)`
                        }}
                            className={` absolute rounded-full
       `}></div>
                    })}

                    <div style={{ zIndex: 10 }}
                        className={`flex justify-center items-center
       rounded-full h-[130px] w-[130px] bg-[#F1F4F9]`}>
                        <div className="relative text-[#06152B] font-['Proxima Nova'] not-italic
         font-[600]  text-[42px] leading-[51px] top-[-3px] left-[2px]">
                            {percentage(datafor_mychart)}%
                        </div>
                    </div>
                </div>
                <div>
                    <ul className=" flex flex-col  items-center top-[100px] w-full ">
                        {datafor_mychart.map((item, i) => (
                            <li className=" flex items-center justify-start w-full m-[12px]">
                                <span style={{ backgroundColor: item.color }}
                                    className={` ml-[63px] w-[14px] h-[14px] 
             rounded-[5px] `}></span>
                                <span className="ml-[14px] font-['Proxima Nova'] 
             not-italic text-[#050708] text-[16px] leading-[19px]
             font-[600] w-[64px]">
                                    {item.title}
                                </span>
                                <span className="ml-[57px] font-['Proxima Nova'] not-italic 
             text-[#809FB8] text-[16px] leading-[19px] font-[600] ">
                                    {item.count}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )

}
