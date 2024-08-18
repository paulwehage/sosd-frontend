import dayjs from 'dayjs';

// Für CrossProjectChart
export const chartDataProcessing = (data: any[]) => {
  const projectMap = data.reduce((acc, point) => {
    if (!acc[point.project_name]) {
      acc[point.project_name] = [];
    }
    acc[point.project_name].push({
      date: dayjs(point.date).valueOf(),
      co2: point.total_co2_consumption
    });
    return acc;
  }, {} as Record<string, { date: number; co2: number }[]>);

  const allDates = [...new Set(data.map(point => dayjs(point.date).valueOf()))].sort((a, b) => a - b);

  return allDates.map(date => {
    const dataPoint: { date: number } = { date };
    Object.entries(projectMap).forEach(([projectName, points]) => {
      const point = points.find(p => p.date === date);
      dataPoint[projectName] = point ? point.co2 : null;
    });
    return dataPoint;
  });
};

// Für OperationsHistoricalChart
export const processOperationsData = (data: any[]) => {
  const elementMap = new Map<string, Map<number, number>>();
  const dateSet = new Set<number>();

  data.forEach((point) => {
    const elementKey = `${point.infrastructure_element_name} (${point.service_name} - ${point.cloud_provider})`;
    const dateValue = dayjs(point.date).valueOf();
    dateSet.add(dateValue);

    if (!elementMap.has(elementKey)) {
      elementMap.set(elementKey, new Map());
    }
    elementMap.get(elementKey)!.set(dateValue, point.total_co2_consumption);
  });

  const sortedDates = Array.from(dateSet).sort((a, b) => a - b);

  return sortedDates.map(date => {
    const dataPoint: { date: number } = { date };
    elementMap.forEach((dateValues, elementKey) => {
      dataPoint[elementKey] = dateValues.get(date) || null;
    });
    return dataPoint;
  });
};

// Für CicdHistoricalChart
export const processCicdData = (data: any[]) => {
  const pipelineMap = new Map<string, { date: number; co2: number }[]>();

  data.forEach((point) => {
    const key = `${point.pipelineName} (${point.cloudProvider})`;
    if (!pipelineMap.has(key)) {
      pipelineMap.set(key, []);
    }
    pipelineMap.get(key)!.push({
      date: dayjs(point.date).valueOf(),
      co2: point.total_co2_consumption
    });
  });

  const allDates = [...new Set(data.map(point => dayjs(point.date).valueOf()))].sort((a, b) => a - b);

  return allDates.map(date => {
    const dataPoint: { date: number } = { date };
    pipelineMap.forEach((points, key) => {
      const point = points.find(p => p.date === date);
      dataPoint[key] = point ? point.co2 : null;
    });
    return dataPoint;
  });
};

// Für InfrastructureElementHistoricalChart
export const processInfrastructureData = (data: any[]) => {
  return data.map(point => ({
    date: dayjs(point.date).valueOf(),
    co2: point.co2
  }));
};

// Für PipelineHistoricalChart
export const processPipelineData = (data: any[]) => {
  return data.map(item => ({
    date: dayjs(item.date).valueOf(),
    co2: item.total_co2_consumption
  }));
};

export const calculateAverageConsumption = (data: any[]): string => {
  const totalConsumption = data.reduce((sum, item) => sum + item.total_co2_consumption, 0);
  return (totalConsumption / data.length).toFixed(2);
};

export const calculateSCI = (data: any[]): string => {
  // Diese Funktion muss entsprechend Ihrer Berechnungsmethode für SCI implementiert werden
  return "550"; // Placeholder
};