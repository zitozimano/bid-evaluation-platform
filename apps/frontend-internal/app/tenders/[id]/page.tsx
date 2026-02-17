import { TenderOverviewHeader } from "@/components/tenders/TenderOverviewHeader";
import { TenderActionsToolbar } from "@/components/tenders/TenderActionsToolbar";

// inside render:
<TenderOverviewHeader tender={data.tender} />
<TenderActionsToolbar
  tenderId={data.tender.id}
  status={data.tender.status}
  roles={["SCM", "CFO"]} // replace with real auth context
/>
