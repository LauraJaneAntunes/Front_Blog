import React from 'react';

type ArticleCardProps = {
  title: string;
  excerpt?: string;
  author: string;
  date: string;
  imageUrl?: string;
  onClick?: () => void;
  variant?: 'default' | 'simple';
};

export function ArticleCard({
  title,
  excerpt,
  author,
  date,
  imageUrl,
  onClick,
  variant = 'default',
}: ArticleCardProps) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer border rounded-lg p-4 hover:shadow-md transition"
    >
      {variant === 'default' && imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
      )}

      <h2 className="text-xl font-semibold mb-2">{title}</h2>

      {excerpt && (
        <p className="text-gray-600 mb-2">
          {excerpt.length > 100 ? excerpt.slice(0, 100) + '...' : excerpt}
        </p>
      )}

      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>{author}</span>
        <span>{date}</span>
      </div>
    </div>
  );
}