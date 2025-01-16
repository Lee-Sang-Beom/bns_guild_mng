/* echart xAxis label option */
/**
 * @params width
 * @description 각 x축 레이블의 최대 너비를 지정합니다. 너비를 초과하는 레이블은 overflow 옵션에 따라 처리됩니다.
 *
 * ---
 *
 * @params overflow: "truncate" | "none" | "break" | "breakAll" | undefined
 * @description 레이블이 지정된 너비를 초과할 때의 처리 방법을 지정합니다.
 * @return "truncate": 레이블이 너비를 초과할 경우 잘라냅니다.
 * @return "none": 레이블이 잘리지 않고 그대로 표시됩니다.
 * @return "break": 단어 단위로 줄바꿈을 합니다.
 * @return "breakAll": 문자 단위로 줄바꿈을 합니다.
 * @return 예: overflow: "truncate"는 레이블이 너비를 초과할 경우 잘라냅니다.
 *
 * ---
 *
 * @params interval: number
 * @description 레이블을 몇 번째 항목마다 표시할지 지정합니다.
 * @description 기본값은 0으로, 모든 레이블을 표시하며, interval: 0은 모든 레이블을 표시합니다.
 *
 * ---
 *
 * @params margin
 * @description 레이블과 축 사이 간격 지정
 */
export const baseXAxisLabelOption: {
  width: number;
  overflow: "truncate" | "none" | "break" | "breakAll" | undefined;
  interval: number;
  color: string;
  margin: number;
  fontSize: number;
  fontWeight: number;
  fontFamily: string;
} = {
  width: 100,
  overflow: "truncate" as const,
  interval: 0,
  color: "#111",
  margin: 15,
  fontSize: 14,
  fontWeight: 700,
  fontFamily: "pretendard",
};

/* echart yAxis label option */
export const baseYAxisLabelOption: {
  color: string;
  fontSize: number;
  fontWeight: number;
  fontFamily: string;
} = {
  fontSize: 14,
  fontWeight: 700,
  color: "#111",
  fontFamily: "pretendard",
};

/* echart base option */
/**
 * @description 별도로 color, xAxis, yAxis, series 추가 필요
 */
export const eChartBaseOption = {
  // animation: true,
  // animationDuration: 2000,
  // animationEasing: "cubicOut",
  grid: {
    type: "dash",
    left: "1%",
    right: "1%",
    top: "10%",
    bottom: "10%",
    containLabel: true,
  },
  legend: {
    bottom: "bottom",
    textStyle: {
      fontSize: 14,
      fontWeight: 700,
      fontFamily: "pretendard",
    },
  },
  dataZoom: {
    show: false,
    start: 0,
    end: 100,
  },
  tooltip: {
    trigger: "axis" as "item" | "axis" | "none",
    showContent: true,
    axisPointer: {
      type: "shadow" as "line" | "shadow" | "cross" | "none",
    },
  },
};

/* echart yAxis base option */
/**
 * @description 별도로 formatter 추가 필요
 */
export const baseYAxisBaseOption = {
  type: "value" as "value",
  scale: true,
  splitLine: {
    show: true,
    lineStyle: {
      type: "dashed" as any,
    },
  },
  min: 0,
  axisLabel: baseYAxisLabelOption as any,
};

/* echart seriesLabel base option */
export const baseSeriesLabelOption = {
  show: true,
  position: "top",
  textStyle: {
    fontSize: 14,
    fontWeight: 700,
    color: "#111",
    fontFamily: "pretendard",
  },
};

/* echart series base option */
/**
 * @description 별도로 name, dataa, yAxisIndex, type, emphasis, smooth, type, seriesLayoutBy, emphasis 등의 추가옵션 적용 필요
 */
export const baseSeriesOption = {
  yAxisIndex: 0,
  type: "bar",
  // stack: "total", // stack은 해당 차트를 누적형으로 볼것인지를 구분
  seriesLayoutBy: "row", // 데이터 배열의 레이아웃 방식을 지정 > 데이터 배열이 행단위ㅣ로 해석
  emphasis: { focus: "series" }, // 마우스 호버 시 강조(포커스)할 요소를 지정
  smooth: false,
};

/* get echart yAxis maximum value */
/**
 * @description 소계 포함으로 yAxis 배열 길이가 1을 초과할 때, split line을 맞추기 위해 yAxis[0]에 표시할 값의 최대값을 구하는 함수
 */
export const getYAxisMaxNumber = (dataList: any[]) => {
  let maxNum = 0;
  let roundNum = 10;
  let hasMinus = false;

  // dataList에서 최대값 찾기
  for (let i = 0; i < dataList.length; i++) {
    if (dataList[i].value < 0) hasMinus = true;

    if (i == 0) {
      maxNum = dataList[i].value;
    } else if (maxNum < dataList[i].value) {
      maxNum = dataList[i].value;
    }
  }

  if (hasMinus) {
    if (maxNum <= 1) {
      return 1;
    } else if (maxNum <= 2) {
      return 2;
    } else if (maxNum <= 4) {
      return 4;
    } else if (maxNum <= 8) {
      return 8;
    }
  }

  if (maxNum <= 1) {
    return 1;
  } else if (maxNum <= 5) {
    return 5;
  } else if (maxNum <= 25) {
    return 25;
  } else {
    while (true) {
      if (roundNum * 10 * 10 <= maxNum) {
        roundNum *= 10;
        continue;
      }

      let divide = Math.ceil(maxNum / (roundNum * 5));
      return divide * roundNum * 5;
    }
  }
};

/**
 * @description 소계 포함으로 yAxis 배열 길이가 1을 초과할 때, split line을 맞추기 위해 yAxis[0]에 표시할 값의 최소값을 구하는 함수
 */
export const getYAxisMinNumber = (dataList: any[]) => {
  let minNum = 0;

  // dataList에서 최소값 찾기
  for (let i = 0; i < dataList.length; i++) {
    if (i == 0) {
      minNum = dataList[i].value;
    } else if (minNum > dataList[i].value) {
      minNum = dataList[i].value;
    }
  }

  if (Number(minNum) >= 0) {
    return 0;
  }

  if (minNum > -1) {
    return -1;
  } else if (minNum > -2) {
    return -2;
  } else if (minNum > -4) {
    return -4;
  } else if (minNum > -8) {
    return -8;
  }

  if (Number.isInteger(minNum)) {
    return Number((minNum / 10) * 10) * 1.2;
  } else {
    return Number(minNum * 1.2).toFixed(2);
  }
};

/**
 * @description 시작 Index 값과 구해야 할 컬러 개수를 받아 차트 색상 배열을 반환하는 함수
 */
export const getChartColorArr = (startIndex: number, colorCount: number) => {
  const COLOR_ARRAY: string[] = [
    "#3E7CF3",
    "#FF6287",
    "#FFBF45",
    "#5BC3AA",
    "#BEA2FC",
    "#A6E440",
    "#69AEFF",
    "#FFA450",
    "#A054B9",
    "#9FC5E8",
    "#8085E9",
    "#F487CF",
    "#23408A",
    "#B5BFD3",
  ];

  let result: string[] = [];
  let findIndex: number = startIndex;

  while (result.length < colorCount) {
    if (findIndex === COLOR_ARRAY.length) {
      findIndex = 0;
    }
    result.push(COLOR_ARRAY[findIndex]);
    findIndex++;
  }

  return result;
};
