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
      const chartSeriesData = [
        {
          label: "직업 별 인원 수(대표 캐릭터)",
          value: chartData?.map((item) => item.representCount) || [],
          color: "#ff6287", // chart1
        },
        {
          label: "직업 별 인원 수(서브 캐릭터)",
          value: chartData?.map((item) => item.subCount) || [],
          color: "#62b4ff", // chart2
        },
        {
          label: "직업 별 인원 수(전체)",
          value: chartData?.map((item) => item.totalCount) || [],
          color: "#5bc3aa", // chart3
        },
      ];

      // ECharts 옵션 설정
      let option: echarts.EChartsOption = {
        ...eChartBaseOption,
        color: chartSeriesData.map((s) => s.color), // 직업별 색상 설정
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
        series: chartSeriesData.map((seriesItem) => ({
          ...baseSeriesOption,
          name: seriesItem.label,
          type: "bar",
          barWidth: "20%",
          data: seriesItem.value.map((val: number) => ({
            value: val,
            itemStyle: {
              borderRadius: [0, 0, 0, 0],
            },
            label: {
              ...baseSeriesLabelOption,
              show: false,
              formatter: `${val.toLocaleString()}`, // 천 단위 구분
            },
          })),
          yAxisIndex: 0,
        })),
      };

      mngChart.setOption(option);
      window.addEventListener("resize", () => mngChart.resize());

      return () => {
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
