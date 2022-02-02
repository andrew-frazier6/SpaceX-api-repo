import React from 'react'
import { Pie } from '@visx/shape';
import { Group } from '@visx/group';
import { Text } from '@visx/text';

export default function PieChart({ data, modeledData, active, setActive }) {

    const width = 600;
    const half = width / 2;

    return (
        <div className='pie-cahrt-container'>
            <svg width={width} height={width} >
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
                        }} padAngle={0.01}>
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
                            <Text textAnchor="middle" fill="#fff" fontSize={40} dy={-20}>
                                {/* {active === 'Success' ? modeledData[0].total : modeledData[1].total} */}
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
                            <Text textAnchor="middle" fill="#fff" fontSize={40} dy={-20}>
                                {/* {`${Math.floor(modeledData[0].total / 152 * 100)}%`} */}
                            </Text>

                            <Text textAnchor="middle" fill="#aaa" fontSize={20} dy={20}>
                                {/* {`${data.length} total launches`} */}
                            </Text>
                        </>
                    )}
                </Group>
            </svg >
        </div >
    )
}