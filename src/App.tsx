import { useState } from 'react'
import './App.css'
import type {User, UsersQueryResponse, UsersQueryVariables} from "./types/user.ts";
import {graphqlClient} from "./graphql/client.ts";
import {USERS_QUERY} from "./graphql/queries.ts";

function App() {
    const [idsText, setIdsText] = useState('');
    const [users, setUsers] = useState<User[]>([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        const ids = idsText
            .split('\n')
            .map((id) => id.trim())
            .filter((id) => id.length > 0);

        if (ids.length === 0) {
            setUsers([]);
            setErrorMessage('ユーザIDを入力してください。');
            return;
        }

        setLoading(true);
        setErrorMessage('');

        try {
            const data = await graphqlClient.request<UsersQueryResponse, UsersQueryVariables>(
                USERS_QUERY,
                {ids},
            );
            setUsers(data.users);
        } catch (error) {
            console.error(error);
            setUsers([]);
            setErrorMessage('ユーザー情報の取得に失敗しました。');
        } finally {
            setLoading(false);
        }
    }
    return (
        <main className="container">
            <h1>ユーザー検索</h1>

            <section className="search-panel">
                <label htmlFor="user-ids">ユーザーID</label>
                <textarea
                    id="user-ids"
                    value={idsText}
                    onChange={(event) => setIdsText(event.target.value)}
                    placeholder="1行に1つのユーザーIDを入力してください"
                    rows={6}
                />

                <button type="button" onClick={handleSearch} disabled={loading}>
                    {loading ? '取得中...' : '取得'}
                </button>

            </section>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <section className="result-panel">
                <h2>取得結果</h2>

                {users.length === 0 ? (
                    <p>表示するユーザーがありません。</p>
                ) : (
                    <table>
                        <thead>
                        <tr>
                            <td>ID</td>
                            <td>名前</td>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </section>
        </main>
    );
}

export default App;
