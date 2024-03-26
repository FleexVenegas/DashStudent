// Components
import Container from "@/components/molecules/Container/Container";

// Styles
import Dstyle from "./Dashboard.module.scss";
import Title from "@/components/atoms/Title/Title";
import CardOption from "@/components/molecules/CardOption/CardOption";
import BarChart from "@/components/organims/BarChart/BarChart";

const Dashboard = () => {
    return (
        <Container className={Dstyle.Dashboard}>
            <div className={Dstyle.main_dash}>
                <Title title="Dashboard" description="Dash" />
                <div className={Dstyle.exp_dash}>
                    <CardOption records={10} text="Active" />
                    <CardOption records={5} text="Pending" />
                    <CardOption records={8} text="Inactive" />
                    <CardOption records={23} text="Total records" />
                </div>
                <div className={Dstyle.cnt_chart}>
                    <BarChart />
                </div>
            </div>
        </Container>
    );
};

export default Dashboard;
