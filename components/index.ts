import dynamic from "next/dynamic";

const Loader = dynamic(import(/* webpackChunkName: "Loader" */ './Loader'))
const ErrorState = dynamic(import(/* webpackChunkName: "ErrorState" */ './ErrorState'), { ssr: false })
const CatchModal = dynamic(import(/* webpackChunkName: "CatchModal" */ './CatchModal'), { ssr: false })
const ReleaseModal = dynamic(import(/* webpackChunkName: "ReleaseModal" */ './ReleaseModal'), { ssr: false })

export { Loader, ErrorState, CatchModal, ReleaseModal }