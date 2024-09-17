import { StepSwitcherClient } from './StepSwitcherClient'

import { IWidgetProps } from '@/shared/types';

function StepSwitcher(props: IWidgetProps) {
    return <StepSwitcherClient {...props} />
}

StepSwitcher.displayName = "StepSwitcher";
export default StepSwitcher;