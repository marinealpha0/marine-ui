import React from 'react';

const getInitials = (name) => {
    if (!name) return 'U';
    const nameParts = name.split(' ');
    if (nameParts.length > 1) {
        return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
};

const getAvatarColor = (name) => {
    const colors = [
        'bg-blue-50 text-blue-600 border-blue-200',
        'bg-indigo-50 text-indigo-600 border-indigo-200',
        'bg-purple-50 text-purple-600 border-purple-200',
        'bg-pink-50 text-pink-600 border-pink-200',
        'bg-rose-50 text-rose-600 border-rose-200',
        'bg-orange-50 text-orange-600 border-orange-200',
        'bg-emerald-50 text-emerald-600 border-emerald-200',
        'bg-teal-50 text-teal-600 border-teal-200',
        'bg-cyan-50 text-cyan-600 border-cyan-200',
    ];
    if (!name) return colors[0];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
};

const CompanyAvatar = React.memo(({ name, logo, width = 40, height = 40 }) => {
    const [error, setError] = React.useState(false);
    const handleImageError = () => setError(true);

    const colorClass = getAvatarColor(name);

    return (
        <div
            className={`flex items-center justify-center rounded-lg border shadow-sm overflow-hidden transition-transform hover:scale-105 ${!logo || error ? colorClass : 'bg-white border-gray-200'}`}
            style={{
                width: `${width}px`,
                height: `${height}px`,
            }}
            title={name}
        >
            {logo && !error ? (
                <img
                    src={logo}
                    alt={name}
                    className="w-full h-full object-cover"
                    onError={handleImageError}
                />
            ) : (
                <span className="font-bold text-xs tracking-wider">
                    {getInitials(name)}
                </span>
            )}
        </div>
    );
});

export default CompanyAvatar;
