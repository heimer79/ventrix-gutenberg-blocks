import { registerBlockType } from "@wordpress/blocks";
import edit from "./edit";
import save from "./save";
import "./style.scss";
import "./editor.scss";

registerBlockType("ventrix-gutenberg-blocks/testimonial-card", {
	edit,
	save,
});
