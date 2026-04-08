import { Head, useForm, router } from '@inertiajs/react';
import DashboardLayout from '@/layouts/dashboard-layout';

import {
    Users,
    ShieldAlert,
    Trash2,
    Key,
    Ban,
    CheckCircle,
} from 'lucide-react';

import { useState } from 'react';

export default function UserIndex({ users }: any) {
    const [selectedUser, setSelectedUser] = useState<any>(null);

    const [isResetModal, setIsResetModal] = useState(false);

    const { data, setData, put, processing, reset } = useForm({
        password: '',
    });

    const handleToggleStatus = (id: number) => {
        if (confirm('Ubah status aktif akun ini?')) {
            // Gunakan string literal untuk route

            router.patch(`/admin/users/${id}/toggle`);
        }
    };

    const handleDelete = (id: number) => {
        if (confirm('Hapus akun ini secara permanen?')) {
            router.delete(`/admin/users/${id}`);
        }
    };

    const handleResetPassword = (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedUser) return;

        router.put(
            `/admin/users/${selectedUser.id}/reset-password`,
            {
                password: data.password,
            },

            {
                onSuccess: () => {
                    setIsResetModal(false);

                    reset();

                    alert('Password berhasil diubah!');
                },

                onError: (errors) => {
                    console.error(errors);

                    alert('Gagal mereset password: ' + JSON.stringify(errors));
                },
            },
        );
    };

    // Cek apakah users ada

    if (!users) {
        return (
            <DashboardLayout
                breadcrumbs={[
                    { title: 'Manajemen User', href: '/admin/users' },
                ]}
            >
                <Head title="Manajemen User" />

                <div className="p-6">
                    <div className="text-center text-red-500">
                        Data users tidak tersedia
                    </div>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout
            breadcrumbs={[{ title: 'Manajemen User', href: '/admin/users' }]}
        >
            <Head title="Manajemen User" />

            <div className="p-6">
                <div className="mb-6">
                    <h2 className="flex items-center gap-2 text-2xl font-bold">
                        <Users className="h-6 w-6" /> Manajemen Pengguna
                    </h2>
                </div>

                <div className="overflow-hidden rounded-xl border border-sidebar-border bg-white shadow-sm dark:bg-neutral-900">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-neutral-50 text-[10px] font-black tracking-widest uppercase dark:bg-neutral-800">
                            <tr>
                                <th className="px-6 py-4">User</th>

                                <th className="px-6 py-4">Role</th>

                                <th className="px-6 py-4">Status</th>

                                <th className="px-6 py-4 text-right">Aksi</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-sidebar-border/50">
                            {users.data && users.data.length > 0 ? (
                                users.data.map((u: any) => (
                                    <tr
                                        key={u.id}
                                        className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/50"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-neutral-800 dark:text-neutral-200">
                                                {u.name}
                                            </div>

                                            <div className="text-xs text-neutral-500">
                                                {u.email}
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 text-[10px] font-bold uppercase">
                                            {u.role_id === 1
                                                ? 'ADMIN'
                                                : u.role_id === 2
                                                  ? 'EXPERT'
                                                  : 'USER'}
                                        </td>

                                        <td className="px-6 py-4">
                                            {u.email_verified_at ? (
                                                <span className="flex items-center gap-1 font-bold text-green-600">
                                                    <CheckCircle className="h-3 w-3" />{' '}
                                                    AKTIF
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1 font-bold text-red-500">
                                                    <ShieldAlert className="h-3 w-3" />{' '}
                                                    NONAKTIF
                                                </span>
                                            )}
                                        </td>

                                        <td className="space-x-2 px-6 py-4 text-right">
                                            <button
                                                onClick={() =>
                                                    handleToggleStatus(u.id)
                                                }
                                                className="rounded-lg p-2 text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
                                                title="Toggle Status"
                                            >
                                                <Ban className="h-4 w-4" />
                                            </button>

                                            <button
                                                onClick={() => {
                                                    setSelectedUser(u);

                                                    setIsResetModal(true);
                                                }}
                                                className="rounded-lg p-2 text-amber-600 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                                                title="Reset Password"
                                            >
                                                <Key className="h-4 w-4" />
                                            </button>

                                            <button
                                                onClick={() =>
                                                    handleDelete(u.id)
                                                }
                                                className="rounded-lg p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                                                title="Hapus User"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="px-6 py-8 text-center text-neutral-500"
                                    >
                                        Tidak ada data pengguna
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}

                {users.links && (
                    <div className="mt-4 flex justify-center gap-2">
                        {users.links.map((link: any, index: number) => (
                            <button
                                key={index}
                                onClick={() => router.get(link.url)}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className={`rounded-lg px-4 py-2 text-sm ${
                                    link.active
                                        ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
                                        : 'bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700'
                                }`}
                                disabled={!link.url}
                            />
                        ))}
                    </div>
                )}

                {/* MODAL RESET */}

                {isResetModal && selectedUser && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                        <div className="w-full max-w-md rounded-3xl bg-white p-8 text-neutral-900 shadow-2xl dark:bg-neutral-900 dark:text-white">
                            <h3 className="mb-4 text-xl font-bold">
                                Reset Password: {selectedUser.name}
                            </h3>

                            <form
                                onSubmit={handleResetPassword}
                                className="space-y-4"
                            >
                                <input
                                    type="password"
                                    placeholder="Password Baru"
                                    className="w-full rounded-xl border border-sidebar-border bg-white p-3 dark:bg-neutral-800 dark:text-white"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData('password', e.target.value)
                                    }
                                    required
                                    minLength={8}
                                />

                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsResetModal(false)}
                                        className="flex-1 rounded-xl border border-neutral-300 py-3 font-bold text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
                                    >
                                        Batal
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={processing || !data.password}
                                        className="flex-1 rounded-xl bg-neutral-900 py-3 font-bold text-white disabled:opacity-50 dark:bg-neutral-100 dark:text-neutral-900"
                                    >
                                        {processing
                                            ? 'Memproses...'
                                            : 'Update Password'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
