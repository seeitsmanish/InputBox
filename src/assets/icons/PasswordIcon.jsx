import { Eye } from 'lucide-react';
import { EyeOff } from 'lucide-react';

const App = ({ show, ...props }) => {

    if (show) {
        return <EyeOff {...props} />
    }

    return (
        <Eye {...props} />
    );
};

export default App;
