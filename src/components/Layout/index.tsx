import MainContainer from "../MainContainer";
import Toolbar from "../Toolbar";


const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <MainContainer>
            <Toolbar />
            {children}
        </MainContainer>
    )
}



export default Layout;