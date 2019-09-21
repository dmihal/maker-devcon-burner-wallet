import React, { Fragment } from "react";
import injectSheet from "react-jss";
import { Asset } from "@burner-wallet/assets";
import HistoryEvent from "@burner-wallet/core/HistoryEvent";
import PluginElements, {
  PluginElementsProps
} from "../../components/PluginElements";

const HistoryPluginElements = PluginElements as React.FC<
  PluginElementsProps & { event: HistoryEvent }
>;

const styles = {
  container: {
    display: "flex",
    flexDirection: "flex-row",
    background: "none",
    padding: 8,
    fontSize: "20px",
    margin: "8px 0",
    alignItems: "center",
    overflow: "hidden",
    whiteSpace: "nowrap"
  },
  column: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    overflow: "hidden",
    whiteSpace: "nowrap"
  },
  address: {
    width: 160,
    display: "inline-block",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden"
  },
  value: {
    display: "flex",
    justifyContent: "flex-end",
    fontSize: "24px",
    whiteSpace: "nowrap"
  },
  assetName: {
    fontSize: "14px",
    fontWeight: "600",
    textTransform: "uppercase",
    color: "#666",
    justifyItems: "flex-end"
  },
  details: {
    flex: "1 0",
    overflow: "hidden"
  },
  mainDetail: {
    textOverflow: "ellipsis",
    overflow: "hidden"
  },
  txType: {
    fontSize: "24px",
    marginRight: 4,
    color: "#FD9D28" // Todo: Set the color based on a conditional. #28C081 for receiving and #FD9D28 for sending
  },
  subDetail: {
    fontSize: 14
  }
};

interface HistoryListEventProps {
  event: HistoryEvent;
  account?: string;
  classes: any;
  navigateTo: (path: string) => void;
}

const HistoryListEvent: React.FC<HistoryListEventProps> = ({
  event,
  account,
  classes,
  navigateTo
}) => {
  const asset = event.getAsset();
  if (!asset) {
    console.warn(`Could not find asset ${event.asset}`);
    return null;
  }

  let type;
  let main;
  let onClick;
  let subDetail = null;
  switch (event.type) {
    case "send":
      const isReceive = event.to === account;
      type = isReceive ? "\u2199" : "\u2197";
      // TODO: Remove line 90
      main = (
        <Fragment>
          <span
            className={classes.address}
            title={isReceive ? event.from : event.to}
          >
            {isReceive ? event.from : event.to}
          </span>
        </Fragment>
      );
      if (event.message && event.message.length > 0) {
        subDetail = event.message;
      }
      onClick = () => navigateTo(`/receipt/${asset.id}/${event.tx}`);
      break;
    case "exchange":
      type = "Exchange";
      break;
    default:
      console.warn("Unknown event type", event.type);
  }

  return (
    <div className={classes.container} onClick={onClick}>
      <div className={classes.details}>
        <div className={classes.mainDetail}>{main}</div>
        {subDetail && <div className={classes.subDetail}>{subDetail}</div>}
      </div>
      <div className={classes.column}>
        <div className={classes.value}>
          <div className={classes.txType}>{type}</div>
          {asset.getDisplayValue(event.value)}
        </div>
        <div className={classes.assetName}>{asset.name}</div>
      </div>
      <HistoryPluginElements position="history-event" event={event} />
    </div>
  );
};

export default injectSheet(styles)(HistoryListEvent);
