export default function Header({ totalTasks, completedTasks, pendingTasks }) {
    return (
        <header className="mb-4 rounded-2xl border border-surface-700 bg-surface-900 p-5 sm:p-6">
            <h1 className="text-3xl font-bold text-surface-100 sm:text-4xl">
                Todo List
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-surface-200/85 sm:text-base">
                Track your daily tasks with a clean dark dashboard and finish what matters first.
            </p>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-surface-700 bg-surface-800 p-4">
                    <p className="text-xs uppercase tracking-wide text-surface-300">Total</p>
                    <p className="mt-1 text-2xl font-bold text-surface-100">{totalTasks}</p>
                </div>
                <div className="rounded-xl border border-surface-700 bg-surface-800 p-4">
                    <p className="text-xs uppercase tracking-wide text-surface-300">Pending</p>
                    <p className="mt-1 text-2xl font-bold text-warning-500">{pendingTasks}</p>
                </div>
                <div className="rounded-xl border border-surface-700 bg-surface-800 p-4">
                    <p className="text-xs uppercase tracking-wide text-surface-300">Completed</p>
                    <p className="mt-1 text-2xl font-bold text-success-500">{completedTasks}</p>
                </div>
            </div>
        </header>
    );
}