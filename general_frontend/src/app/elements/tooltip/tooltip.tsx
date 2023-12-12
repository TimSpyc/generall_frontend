import "./tooltip.css";
import { TooltipTrigger, Tooltip, ActionButton } from "@adobe/react-spectrum";
import { CustomTooltipProps } from "./tooltip-types";

const CustomTooltip = ({ status, message }: CustomTooltipProps) => {
  return (
    <div className="tooltip">
      {status != undefined && (
        <TooltipTrigger>
          <ActionButton aria-label={message}>i</ActionButton>
          <Tooltip>{message}</Tooltip>
        </TooltipTrigger>
      )}
    </div>
  );
};

export default CustomTooltip;
