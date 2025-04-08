import javax.swing.*;
import java.awt.*;

public class Generator {
    private String insert = "insert into ", values = " values(";
    private JTextArea ta;
    public static void main(String[] args) {
        new Generator();
    }

    Generator(){
        JFrame frame = new JFrame();
        frame.setLayout(new GridLayout(2, 1));
        frame.setSize(new Dimension(500, 500));
        ta = new JTextArea();
        JButton start = new JButton("Start");
        start.addActionListener(ev->{
            System.out.println(temp());});
        frame.add(ta);
        frame.add(start);
        frame.setVisible(true);
    }
    
    private String[] insertDataIntoTable(String table, String[] datas){
        String[] output = new String[datas.length];
        for (int i = 0; i < datas.length; i++) {
            output[i] = insert + table + values + datas[i] + ")";
        }
        return output;
    }

    private String temp(){
        return insertDataIntoTable("Pokemon", ta.getText().split("\n"))[0];
    }
}