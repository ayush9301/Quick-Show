// UI Only — Statistics card component for admin dashboard

const StatsCard = () => {
  const isPositive = change >= 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-600 mb-1">{}</p>
          <p className="text-3xl font-bold text-slate-900 mb-2">{}</p>
          <div className="flex items-center">
            {/* <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? '↑' : '↓'} {Math.abs(change)}%
            </span> */}
            <span className="text-sm text-slate-500 ml-2">vs last month</span>
          </div>
        </div>
        {/* <div className={`p-3 rounded-xl bg-gradient-to-br ${}`}>
          {icon}
        </div> */}
      </div>
    </div>
  );
};

export default StatsCard;
