body {
    font-family: Arial, sans-serif;
    background: white;
    color: #333;
    text-align: center;
    padding: 20px;
}

#resetBtn {
    background-color: #ff6666;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    margin-bottom: 20px;
}

.grid-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 15px;
    margin-top: 20px;
}

.semestre {
    border: 2px solid #ccc;
    padding: 10px;
    border-radius: 8px;
    background-color: #f4f4f4;
}

.semestre h2 {
    margin-bottom: 10px;
}

.ramo {
    padding: 8px;
    margin: 5px 0;
    border-radius: 5px;
    background-color: #FF9999;
    cursor: pointer;
    user-select: none;
    transition: background-color 0.3s;
}

.ramo.bloqueado {
    background-color: #ccc;
    color: #666;
    cursor: not-allowed;
}

.ramo.aprobado {
    background-color: #d8bcf4;
    text-decoration: line-through;
}
