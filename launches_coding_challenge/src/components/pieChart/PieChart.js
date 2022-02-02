import React, { useMemo } from 'react'
import './styles.css'
import { Pie } from '@visx/shape';
import { Group } from '@visx/group';
import { Text } from '@visx/text';


export const PieChart = ({ chartData, active, setActive }) => {
    const width = 600;
    const half = width / 2;

    console.log(active)

    const modeledData = useMemo(() => {
        return ([{
            result: "Success",
            total: chartData?.filter(data => data.success).length,
            color: "#25744c"
        },
        {
            result: "Failure",
            total: chartData?.filter(data => !data.success).length,
            color: "#a91114"
        }])
    }, [chartData])

    return (
        <>
            <svg width={width} height={width}>
                <Group top={half} left={half}>
                    <Pie
                        data={modeledData}
                        pieValue={((data) => {
                            const failures = data?.result === 'Failure' ? data.total : 0;
                            const success = data?.result === 'Success' ? data.total : 0;
                            return success + failures;
                        })}
                        outerRadius={half}
                        innerRadius={({ data }) => {
                            const size = active === data.result ? 20 : 12;

                            return half - size;
                        }}
                        padAngle={0.01}>
                        {(pie) => {
                            return pie.arcs.map((arc) => {
                                return (
                                    <g key={arc.data.result} style={{ cursor: 'pointer' }} onMouseEnter={() => setActive(arc.data.result)}
                                        onMouseLeave={() => setActive(null)}>
                                        <path d={pie.path(arc)} fill={arc.data.color}></path>
                                    </g>
                                )
                            })
                        }}
                    </Pie>
                    {active ? (

                        <>
                            <Text textAnchor="middle" fill="black" fontSize={40} dy={-20}>
                                {active === 'Success' ? modeledData[0].total : modeledData[1].total}
                            </Text>

                            <Text
                                textAnchor="middle"
                                fill="#fff"
                                fontSize={30}
                                dy={20}
                            >
                                {active}
                            </Text>
                        </>
                    ) : (
                        <>
                            <Text textAnchor="middle" fill="black" fontSize={40} dy={-20}>
                                {`${Math.floor(modeledData[0].total / 152 * 100)}%`}
                            </Text>

                            <Text textAnchor="middle" fill="#aaa" fontSize={20} dy={20}>
                                {`${chartData.length} total launches`}
                            </Text>
                        </>
                    )}
                </Group>
            </svg>
        </>
    )
}
