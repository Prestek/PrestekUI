export interface CardsResumeProps{
    cards: CardResumeProps[];
}

export interface CardResumeProps{
    title: string;
    value: number;
    icon: string;
}

export interface GraphicProps{
    lastMonthData: BarChartData;
    currentMonthName: string;
    onPress: () => void;
}

export interface BarChartData{
    labels: string[];
    datasets: {
        data: number[];
    }[];
}