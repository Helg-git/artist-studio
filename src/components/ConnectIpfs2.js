
import { storeMeta } from '../service/ipfs-service'
import 'react-notifications-component/dist/theme.css'
import { ArweaveWebWallet } from 'arweave-wallet-connector';
import { toArweave } from '../service/arweave-service';
function ConnectIpfs() {

    const connectIpfs = async () => {
        await storeMeta("hello world")
    }
    return (
        <div>
            <a href="javascript:void(0);" onClick={connectIpfs}>
                connectIpfs
            </a>
        </div>
    )
}

export default ConnectIpfs
