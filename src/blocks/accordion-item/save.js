import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

const Save = ({ attributes }) => {
	const { headingText, headingLink, headingLevel, numberPrefix, amountSuffix } = attributes;
	const blockProps = useBlockProps.save({
		className: 'accordion-item',
	});

	// Build the heading title with optional link
	const accordionItemTitle = headingLink
		? `<a href="${headingLink}" target="_blank" rel="noopener">${headingText}</a>`
		: headingText;

	return (
		<div {...blockProps}>
			<div className="accordion-title">
				{React.createElement(headingLevel, {
					className: 'accordion-heading',
					dangerouslySetInnerHTML: {
						__html: `${numberPrefix || ''} ${accordionItemTitle || ''} ${amountSuffix || ''}`,
					},
				})}
			</div>

			<div className="accordion-content">
				<InnerBlocks.Content />
			</div>
		</div>
	);
};

export default Save;