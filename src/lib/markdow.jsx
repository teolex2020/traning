import React from 'react'
import ReactMarkdown from 'react-markdown'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism'







export function MarkdownRenderer({ content }) {
	return (
		<div className='markdown-container prose max-w-none'>
			<ReactMarkdown
				components={{
					// Стилізація заголовків
					h1: ({ ...props }) => (
						<h1 className='text-3xl font-bold my-3' {...props} />
					),
					h2: ({ ...props }) => (
						<h2 className='text-2xl font-bold my-3' {...props} />
					),
					h3: ({ ...props }) => (
						<h3 className='text-xl font-bold my-2' {...props} />
					),

					// Стилізація абзаців
					p: ({ ...props }) => (
						<p className='my-2 leading-relaxed' {...props} />
					),

					// Стилізація списків
					ul: ({ ...props }) => (
						<ul className='list-disc list-inside my-2' {...props} />
					),
					ol: ({ ...props }) => (
						<ol className='list-decimal list-inside my-2' {...props} />
					),
					li: ({ ...props }) => <li className='my-1' {...props} />,

					// Стилізація посилань
					a: ({ ...props }) => (
						<a
							className='text-blue-500 hover:underline'
							target='_blank'
							rel='noopener noreferrer'
							{...props}
						/>
					),

					// Стилізація коду
					code: ({ className, children, ...props }) => {
						const match = /language-(\w+)/.exec(className || '')
						const inline = !match

						return inline ? (
							<code className='bg-gray-200 p-1 rounded' {...props}>
								{children}
							</code>
						) : (
							<SyntaxHighlighter
								style={prism}
														language={match[1]}
								PreTag='div'
								{...props}
							>
								{String(children).replace(/\n$/, '')}
							</SyntaxHighlighter>
						)
					},

					// Стилізація цитат
					blockquote: ({ ...props }) => (
						<blockquote
							className='border-l-4 border-gray-300 pl-4 italic my-2'
							{...props}
						/>
					),

					// Стилізація таблиць
					table: ({ ...props }) => (
						<table
							className='w-full border-collapse border border-gray-300 my-2'
							{...props}
						/>
					),
					th: ({ ...props }) => (
						<th
							className='border border-gray-300 p-2 bg-gray-100 font-bold'
							{...props}
						/>
					),
					td: ({ ...props }) => (
						<td className='border border-gray-300 p-2' {...props} />
					),
				}}
			>
				{content}
			</ReactMarkdown>
		</div>
	)
}
