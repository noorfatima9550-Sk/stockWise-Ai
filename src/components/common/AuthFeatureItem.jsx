function AuthFeatureItem({ icon: Icon, title, description }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-white/70 border border-primary-200 flex items-center justify-center text-primary-600">
        <Icon size={20} />
      </div>
      <div>
        <h4 className="font-semibold text-gray-900 text-sm mb-0.5">
          {title}
        </h4>
        <p className="text-sm text-gray-600 leading-snug">{description}</p>
      </div>
    </div>
  );
}

export default AuthFeatureItem;