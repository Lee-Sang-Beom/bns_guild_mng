"use client";
import * as echarts from "echarts";
import "./chart.css";
import ms from "./Dashboard.module.scss";
import {
  baseSeriesLabelOption,
  baseSeriesOption,
  baseXAxisLabelOption,
  baseYAxisBaseOption,
  eChartBaseOption,
} from "@/utils/chart/eChartUtils";
import { useEffect, useRef } from "react";
import { useGetJobDistributionList } from "@/hooks/dashboard/useGetJobDistributionList";

export default function DisplayJobListCard() {
  const chartRef = useRef<HTMLDivElement>(null);
  const { data: chartData } = useGetJobDistributionList();

  /**
   * @name useEffect
   * @description 차트 데이터 세팅
   */
  useEffect(() => {
    const chartDom = chartRef.current;
    let mngChart: any;

    if (chartDom) {
      mngChart = echarts.getInstanceByDom(chartDom);
      if (!mngChart) {
        mngChart = echarts.init(chartDom);
      }

      // X축: 직업 리스트
      const chartXAxisData = chartData?.map((item) => item.job) || [];

      // Y축: 직업별 카운트 값
      const chartDataValue = [
        {
          label: "직업별 인원수",
          value: chartData?.map((item) => item.count) || [],
        },
      ];

      // ECharts 옵션 설정
      let option: echarts.EChartsOption = {
        ...eChartBaseOption,
        color: ["#ff6287"], // 기본 색상
        xAxis: {
          type: "category",
          axisLabel: baseXAxisLabelOption,
          data: chartXAxisData,
        },
        yAxis: {
          ...baseYAxisBaseOption,
        },
        legend: {
          bottom: "top",
          padding: [20, 0, 0, 0],
          textStyle: {
            fontSize: 12,
            fontWeight: 600,
            fontFamily: "scdream",
          },
        },
        // @ts-ignore
        series: chartDataValue.map((seriesItem: any) => {
          return {
            ...baseSeriesOption,
            name: seriesItem.label,
            type: "bar",
            stack: "total",
            barWidth: "20%",
            data: seriesItem.value.map((val: number) => {
              return {
                value: val,
                itemStyle: {
                  borderRadius: [0, 0, 0, 0],
                },
                label: {
                  ...baseSeriesLabelOption,
                  show: false,
                  formatter: `${val.toLocaleString()}`, // 천 단위 구분
                },
              };
            }),
            yAxisIndex: 0,
          };
        }),
      };

      mngChart.setOption(option);
      window.addEventListener("resize", () => mngChart.resize());

      return () => {
        // 컴포넌트가 DOM에서 제거되기 직전에 실행
        mngChart.dispose(); // 생성된 차트 삭제하고 메모리 해제
        window.removeEventListener("resize", () => mngChart.resize());
      };
    }
  }, [chartData]);

  return (
    <div
      id="bar_chart"
      ref={chartRef}
      className={`${ms.card} ${ms.card_top}`}
    ></div>
  );
}
