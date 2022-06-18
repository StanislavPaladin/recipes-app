import Tooltip from "rc-tooltip";
import styles from "./TooltipPage.module.css";

const TooltipPage = ({tooltip, name}) => {
	
	return (
			<Tooltip
				style={{ color: "transparent" }}
				placement="bottom"
				trigger={["hover"]}
				overlay={<div className={styles.tooltip}>
					<div className={styles.tooltip__title}>{tooltip.type}! {tooltip.title}</div>
					<div className={styles.tooltip__text}>{tooltip.text}</div>
					{tooltip.geo&& <a className={styles.tooltip__link}  rel="noreferrer" target={'_blank'} href={`https://www.google.com/maps/place/${tooltip.geo}`}>Deteails</a>}
				</div>}
			>
				<span className={styles.tooltip__name}>{name}</span>
				
			</Tooltip>
	);
};

export default TooltipPage;
